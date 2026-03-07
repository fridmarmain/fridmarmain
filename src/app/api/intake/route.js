import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2026-01-07",
});

const resend = new Resend(process.env.RESEND_API_KEY);

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

function buildAdminEmail(answers) {
  const branchKey = Object.keys(answers).find((k) => k.endsWith("Details"));
  const branchData = branchKey ? answers[branchKey] : null;

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
      <h2 style="background:#1e293b;color:#fff;padding:20px;margin:0;">New Intake Submission</h2>
      <div style="padding:24px;border:1px solid #e2e8f0;border-top:none;">
        <h3 style="margin-top:0;">Contact Info</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#64748b;width:160px;">Name</td><td style="padding:8px 0;font-weight:600;">${answers.personalDetails?.name ?? "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;font-weight:600;">${answers.personalDetails?.email ?? "—"}</td></tr>
        </table>

        <h3 style="margin-top:24px;border-top:1px solid #e2e8f0;padding-top:16px;">Submission Overview</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#64748b;width:160px;">Client Type</td><td style="padding:8px 0;">${answers.clientType ?? "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Urgency</td><td style="padding:8px 0;">${answers.urgency ?? "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Practice Area</td><td style="padding:8px 0;">${answers.practiceArea ?? "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Has Existing Lawyer</td><td style="padding:8px 0;">${answers.hasLawyer ?? "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Intent</td><td style="padding:8px 0;font-weight:600;">${answers.intent ?? "—"}</td></tr>
        </table>

        ${
          branchData
            ? `
        <h3 style="margin-top:24px;border-top:1px solid #e2e8f0;padding-top:16px;">Case Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${Object.entries(branchData)
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:8px 0;color:#64748b;width:160px;text-transform:capitalize;">${k}</td>
              <td style="padding:8px 0;">${Array.isArray(v) ? v.join(", ") : (v ?? "—")}</td>
            </tr>
          `,
            )
            .join("")}
        </table>`
            : ""
        }

        ${
          answers.conflicts
            ? `
        <h3 style="margin-top:24px;border-top:1px solid #e2e8f0;padding-top:16px;">Conflict Check</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${Object.entries(answers.conflicts)
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:8px 0;color:#64748b;width:160px;text-transform:capitalize;">${k}</td>
              <td style="padding:8px 0;">${v ?? "—"}</td>
            </tr>
          `,
            )
            .join("")}
        </table>`
            : ""
        }

        ${
          answers.previousLawyer
            ? `
        <h3 style="margin-top:24px;border-top:1px solid #e2e8f0;padding-top:16px;">Previous Counsel</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${Object.entries(answers.previousLawyer)
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:8px 0;color:#64748b;width:160px;text-transform:capitalize;">${k}</td>
              <td style="padding:8px 0;">${Array.isArray(v) ? v.join(", ") : (v ?? "—")}</td>
            </tr>
          `,
            )
            .join("")}
        </table>`
            : ""
        }

        <p style="margin-top:24px;font-size:12px;color:#94a3b8;">Submitted at ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;
}

function buildClientEmailBooking(name) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
      <h2 style="background:#1e293b;color:#fff;padding:20px;margin:0;">Your Intake Submission</h2>
      <div style="padding:24px;border:1px solid #e2e8f0;border-top:none;">
        <p>Hi ${name},</p>
        <p>Thank you for reaching out. We've received your submission and you're one step away from booking your confidential intake call.</p>
        <p>Please use the link below to select a time that works for you:</p>
        <a href="${process.env.CALENDLY_URL}" style="display:inline-block;margin:16px 0;padding:14px 28px;background:#1e293b;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;">Book Your Intake Call</a>
        <p style="color:#64748b;font-size:14px;">If the button doesn't work, copy this link into your browser:<br/>${process.env.CALENDLY_URL}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"/>
        <p style="font-size:12px;color:#94a3b8;">Submitting this form does not create a solicitor-client relationship. A relationship is only established once a retainer agreement is confirmed.</p>
      </div>
    </div>
  `;
}

function buildClientEmailReview(name) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
      <h2 style="background:#1e293b;color:#fff;padding:20px;margin:0;">We've Received Your Submission</h2>
      <div style="padding:24px;border:1px solid #e2e8f0;border-top:none;">
        <p>Hi ${name},</p>
        <p>Thank you for reaching out. We've received all of your information and our team will review it carefully — including any time-sensitive issues and potential conflicts.</p>
        <p>We'll be in touch with you shortly. In the meantime, there's nothing further you need to do.</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"/>
        <p style="font-size:12px;color:#94a3b8;">Submitting this form does not create a solicitor-client relationship. A relationship is only established once a retainer agreement is confirmed.</p>
      </div>
    </div>
  `;
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests." },
      { status: 429 },
    );
  }

  let answers;
  try {
    answers = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (!answers.clientType || !answers.practiceArea || !answers.intent) {
    return NextResponse.json(
      { message: "Incomplete submission." },
      { status: 400 },
    );
  }

  const clientName = answers.personalDetails?.name ?? "there";
  const clientEmail = answers.personalDetails?.email;
  const isBooking = answers.intent === "Book a confidential intake call";
  const branchKey = Object.keys(answers).find((k) => k.endsWith("Details"));
  const branchData = branchKey ? answers[branchKey] : null;

  try {
    // 1. Save to Sanity
    await sanity.create({
      _type: "intakeSubmission",
      name: clientName,
      email: clientEmail ?? "",
      clientType: answers.clientType,
      urgency: answers.urgency ?? "",
      practiceArea: answers.practiceArea,
      branchDetails: branchData ? JSON.stringify(branchData) : "",
      hasLawyer: answers.hasLawyer ?? "",
      previousLawyer: answers.previousLawyer
        ? JSON.stringify(answers.previousLawyer)
        : "",
      conflicts: answers.conflicts ? JSON.stringify(answers.conflicts) : "",
      intent: answers.intent,
      submittedAt: new Date().toISOString(),
    });

    // 2. Notify the law firm
    await resend.emails.send({
      from: "dan@fridmar.com",
      to: "dan@fridmar.com",
      subject: `New Intake: ${answers.practiceArea} — ${answers.urgency ?? "Urgency unknown"}`,
      html: buildAdminEmail(answers),
    });

    // 3. Send confirmation to client (only if they provided an email)
    if (clientEmail) {
      await resend.emails.send({
        from: "dan@fridmar.com",
        to: clientEmail,
        subject: isBooking
          ? "Book Your Confidential Intake Call"
          : "We've Received Your Submission",
        html: isBooking
          ? buildClientEmailBooking(clientName)
          : buildClientEmailReview(clientName),
      });
    }

    return NextResponse.json(
      {
        message: "Success",
        isBooking,
        calendlyUrl: isBooking ? process.env.CALENDLY_URL : null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Intake submission error:", error.message);
    return NextResponse.json(
      { message: "Submission failed. Please try again." },
      { status: 500 },
    );
  }
}
