import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import ContactEmail from "../../../../emails/ContactEmail";

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
      react: ContactEmail({
        name: safeName,
        email: sanitize(email),
        subject: safeSubject,
        message: safeMessage,
      }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
