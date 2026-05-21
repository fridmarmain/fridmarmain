import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2026-01-07",
});

const resend = new Resend(process.env.RESEND_API_KEY);

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
const ALLOWED_SOURCES = [
  "Google Search",
  "Referral",
  "Social Media",
  "Website",
  "Other",
];

const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { min: 5, max: 254 },
  phone: { min: 0, max: 20 },
  service: { min: 0, max: 50 },
  source: { min: 0, max: 100 },
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

function generateEmailHTML(formData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #1a365d 0%, #2d5a8c 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: white; padding: 20px; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #1a365d; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
          .field-value { color: #555; margin-top: 5px; padding: 10px; background: #f0f0f0; border-radius: 4px; }
          .message-box { background: #f5f5f5; border-left: 4px solid #1a365d; padding: 15px; margin-top: 20px; border-radius: 4px; }
          .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${formData.name}</div>
            </div>
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            ${
              formData.phone
                ? `
            <div class="field">
              <div class="field-label">Phone</div>
              <div class="field-value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
            </div>
            `
                : ""
            }
            ${
              formData.service
                ? `
            <div class="field">
              <div class="field-label">Service Type</div>
              <div class="field-value">${formData.service}</div>
            </div>
            `
                : ""
            }
            ${
              formData.source
                ? `
            <div class="field">
              <div class="field-label">How Did You Hear About Us?</div>
              <div class="field-value">${formData.source}</div>
            </div>
            `
                : ""
            }
            <div class="message-box">
              <div class="field-label" style="margin-bottom: 10px;">Message</div>
              <div style="color: #555; white-space: pre-wrap; word-wrap: break-word;">${formData.message}</div>
            </div>
          </div>
          <div class="footer">
            <p>Submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
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

  const { name, email, phone = "", service = "", source = "", message } = body;

  const clean = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone),
    service: sanitize(service),
    source: sanitize(source),
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

  if (clean.source && !ALLOWED_SOURCES.includes(clean.source)) {
    return NextResponse.json(
      { message: "Invalid source selection." },
      { status: 400 },
    );
  }

  // Honeypot check
  if (body._hp && body._hp !== "") {
    return NextResponse.json({ message: "Success" }, { status: 200 });
  }

  try {
    // Save to Sanity
    const sanityResult = await client.create({
      _type: "contact",
      name: clean.name,
      email: clean.email,
      phone: clean.phone,
      service: clean.service,
      source: clean.source,
      message: clean.message,
      submittedAt: new Date().toISOString(),
    });

    // Send email via Resend
    const emailHTML = generateEmailHTML(clean);
    const emailResult = await resend.emails.send({
      from: "dan@fridmar.com", // Reply-to will be the sender's email
      to: "mey@fridmar.com",
      replyTo: clean.email,
      subject: `New Contact Form Submission from ${clean.name}`,
      html: emailHTML,
    });

    // Log email send result (but don't fail the submission if email fails)
    if (emailResult.error) {
      console.error("Email send error:", emailResult.error);
    }

    return NextResponse.json(
      { message: "Success", id: sanityResult._id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { message: "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
