import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2026-01-07",
});

// --- Rate limiting (in-memory, per IP) ---
const rateLimitMap = new Map();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  rateLimitMap.set(ip, { count: entry.count + 1, start: entry.start });
  return false;
}

// --- Field rules ---
const ALLOWED_SERVICES = ["Construction", "dispute", "litigation", "other"];

const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { min: 5, max: 254 },
  phone: { min: 0, max: 20 },
  service: { min: 0, max: 50 },
  message: { min: 10, max: 2000 },
};

function sanitize(value) {
  return String(value ?? "")
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return phone === "" || /^[\d\s\-+().]{7,20}$/.test(phone);
}

async function verifyRecaptcha(token) {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  // score >= 0.5 is a human, lower scores are likely bots
  return data.success && data.score >= 0.5;
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please wait before submitting again." },
      { status: 429 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  // --- Verify reCAPTCHA token ---
  const { recaptchaToken } = body;
  if (!recaptchaToken) {
    return NextResponse.json(
      { message: "reCAPTCHA token missing." },
      { status: 400 },
    );
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return NextResponse.json(
      { message: "reCAPTCHA verification failed. Please try again." },
      { status: 403 },
    );
  }

  const { name, email, phone = "", service = "", message } = body;

  const clean = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone),
    service: sanitize(service),
    message: sanitize(message),
  };

  for (const [field, { min, max }] of Object.entries(FIELD_LIMITS)) {
    const len = clean[field].length;
    if (len < min || len > max) {
      return NextResponse.json(
        { message: `Invalid value for field: ${field}` },
        { status: 400 },
      );
    }
  }

  if (!validateEmail(clean.email)) {
    return NextResponse.json(
      { message: "Invalid email address." },
      { status: 400 },
    );
  }

  if (!validatePhone(clean.phone)) {
    return NextResponse.json(
      { message: "Invalid phone number." },
      { status: 400 },
    );
  }

  if (clean.service && !ALLOWED_SERVICES.includes(clean.service)) {
    return NextResponse.json(
      { message: "Invalid service selection." },
      { status: 400 },
    );
  }

  // Honeypot check
  if (body._hp && body._hp !== "") {
    return NextResponse.json({ message: "Success" }, { status: 200 });
  }

  try {
    const result = await client.create({
      _type: "contact",
      name: clean.name,
      email: clean.email,
      phone: clean.phone,
      service: clean.service,
      message: clean.message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Success", id: result._id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Sanity write error:", error);
    return NextResponse.json(
      { message: "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
