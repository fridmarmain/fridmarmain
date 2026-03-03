import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2026-01-07",
});

// --- Rate limiting (in-memory, per IP) ---
const rateLimitMap = new Map();
const RATE_LIMIT = 3; // max submissions
const RATE_WINDOW = 60_000; // per 60 seconds

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
  return DOMPurify.sanitize(String(value ?? "").trim());
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  // Allow empty or digits/spaces/dashes/plus/parens only
  return phone === "" || /^[\d\s\-+().]{7,20}$/.test(phone);
}

export async function POST(request) {
  // --- Rate limit by IP ---
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please wait before submitting again." },
      { status: 429 },
    );
  }

  // --- Parse body safely ---
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  // --- Only allow known fields (block mass assignment) ---
  const { name, email, phone = "", service = "", message } = body;

  // --- Sanitize all inputs ---
  const clean = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone),
    service: sanitize(service),
    message: sanitize(message),
  };

  // --- Validate lengths ---
  for (const [field, { min, max }] of Object.entries(FIELD_LIMITS)) {
    const len = clean[field].length;
    if (len < min || len > max) {
      return NextResponse.json(
        { message: `Invalid value for field: ${field}` },
        { status: 400 },
      );
    }
  }

  // --- Validate email format ---
  if (!validateEmail(clean.email)) {
    return NextResponse.json(
      { message: "Invalid email address." },
      { status: 400 },
    );
  }

  // --- Validate phone format ---
  if (!validatePhone(clean.phone)) {
    return NextResponse.json(
      { message: "Invalid phone number." },
      { status: 400 },
    );
  }

  // --- Validate service is from allowed list (or empty) ---
  if (clean.service && !ALLOWED_SERVICES.includes(clean.service)) {
    return NextResponse.json(
      { message: "Invalid service selection." },
      { status: 400 },
    );
  }

  // --- Honeypot check (set field name in frontend form) ---
  if (body._hp && body._hp !== "") {
    // Silent rejection — looks like success to a bot
    return NextResponse.json({ message: "Success" }, { status: 200 });
  }

  // --- Write to Sanity ---
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
    // Never expose internal error details to the client
    return NextResponse.json(
      { message: "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
