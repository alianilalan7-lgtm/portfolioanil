import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";

type RateLimitEntry = { count: number; resetAt: number };
const rateLimit = new Map<string, RateLimitEntry>();

const RATE_LIMIT_IP_MAX = 5;
const RATE_LIMIT_IP_WINDOW = 15 * 60 * 1000; // 15 min
const RATE_LIMIT_EMAIL_MAX = 3;
const RATE_LIMIT_EMAIL_WINDOW = 60 * 60 * 1000; // 1 hour

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(2).max(140),
  message: z.string().trim().min(10).max(2000),
  company: z.string().trim().max(120).optional(),
  website: z.string().trim().max(200).optional(), // Honeypot
});

function normalizeOrigin(value: string): string {
  try {
    return new URL(value).origin;
  } catch {
    return value.replace(/\/+$/, "");
  }
}

function getAllowedOrigins(req: NextRequest): Set<string> {
  const origins = new Set<string>();
  const fromEnv = process.env.CONTACT_ALLOWED_ORIGINS
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const origin of fromEnv ?? []) origins.add(normalizeOrigin(origin));
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    origins.add(normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL));
  }

  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  if (host) origins.add(`${proto}://${host}`);

  return origins;
}

function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  return getAllowedOrigins(req).has(normalizeOrigin(origin));
}

function getClientIp(req: NextRequest): string {
  const candidates = [
    req.headers.get("x-forwarded-for")?.split(",")[0],
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0],
    req.headers.get("x-real-ip"),
    req.headers.get("cf-connecting-ip"),
  ];

  return candidates.find((value) => value && value.trim())?.trim() ?? "unknown";
}

function takeRateLimit(
  key: string,
  max: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= max) return true;
  entry.count += 1;
  return false;
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const payload = await req.json();
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, email, subject, message, website } = parsed.data;
    if (website && website.length > 0) {
      // Honeypot hit; respond successfully to reduce bot retries.
      return NextResponse.json({ success: true });
    }

    const ip = getClientIp(req);
    const emailHash = createHash("sha256")
      .update(email.toLowerCase())
      .digest("hex");

    if (takeRateLimit(`ip:${ip}`, RATE_LIMIT_IP_MAX, RATE_LIMIT_IP_WINDOW)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    if (
      takeRateLimit(
        `email:${emailHash}`,
        RATE_LIMIT_EMAIL_MAX,
        RATE_LIMIT_EMAIL_WINDOW
      )
    ) {
      return NextResponse.json(
        { error: "Too many requests from this email. Please try later." },
        { status: 429 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const inboxEmail = process.env.CONTACT_TO_EMAIL ?? "alianilappstore@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "Ali Anil Alan <contact@alianil.com>",
      to: [inboxEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${sanitizeHeader(subject).slice(0, 140)}`,
      text: `New contact message\n\nFrom: ${name} (${email})\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background-color:#1A1C1A;color:#D1D9D1">
          <div style="background-color:#242724;border-radius:16px;padding:32px;border:1px solid rgba(132,165,157,0.15)">
            <h1 style="font-size:24px;color:#84A59D;margin-bottom:8px">New Contact Message</h1>
            <p style="color:#9CA3AF;font-size:14px;margin-bottom:24px">You received a new message from your portfolio site.</p>
            <div style="margin-bottom:16px">
              <p style="font-size:12px;color:#6B7280;margin-bottom:4px">FROM</p>
              <p style="font-size:16px;margin:0">${safeName} (${safeEmail})</p>
            </div>
            <div style="margin-bottom:16px">
              <p style="font-size:12px;color:#6B7280;margin-bottom:4px">SUBJECT</p>
              <p style="font-size:16px;margin:0">${safeSubject}</p>
            </div>
            <div style="border-top:1px solid rgba(132,165,157,0.15);padding-top:16px;margin-top:16px">
              <p style="font-size:12px;color:#6B7280;margin-bottom:4px">MESSAGE</p>
              <p style="font-size:15px;line-height:1.6;white-space:pre-wrap">${safeMessage}</p>
            </div>
          </div>
          <p style="text-align:center;font-size:12px;color:#6B7280;margin-top:24px">This email was sent from your portfolio contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to deliver message" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Send email error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
