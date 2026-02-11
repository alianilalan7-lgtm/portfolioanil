import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

// Simple in-memory rate limiter: max 3 emails per IP per 15 minutes
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

// Sanitize string to prevent email header injection
function sanitize(str: string): string {
  return str.replace(/[\r\n]/g, "").trim().slice(0, 500);
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const safeName = sanitize(name);
    const safeSubject = sanitize(subject);
    const safeMessage = message.trim().slice(0, 2000);

    const { data, error } = await resend.emails.send({
      from: "Ali Anil Alan <contact@alianil.com>",
      to: ["alianilappstore@gmail.com"],
      subject: `Portfolio Contact: ${safeSubject}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background-color:#1A1C1A;color:#D1D9D1">
          <div style="background-color:#242724;border-radius:16px;padding:32px;border:1px solid rgba(132,165,157,0.15)">
            <h1 style="font-size:24px;color:#84A59D;margin-bottom:8px">New Contact Message</h1>
            <p style="color:#9CA3AF;font-size:14px;margin-bottom:24px">You received a new message from your portfolio site.</p>
            <div style="margin-bottom:16px">
              <p style="font-size:12px;color:#6B7280;margin-bottom:4px">FROM</p>
              <p style="font-size:16px;margin:0">${safeName} (${sanitize(email)})</p>
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Send email error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
