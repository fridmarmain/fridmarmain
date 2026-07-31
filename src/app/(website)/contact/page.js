import ContactSection from "@/components/ContactSection";
import React from "react";
import { generateSEO } from "@/lib/seo";
import { getGlobalContactInfo } from "@/lib/sanity"; // 👈 1. Import your new global fetch function

export async function generateMetadata() {
  return generateSEO({
    title: "Contact Us",
    description:
      "Get in touch with Fridmar Professional Corporation for expert legal guidance in construction, real estate, and litigation matters.",
    path: "/contact",
    image: "/og-image.png",
    type: "website",
  });
}

// 👈 2. Turned this into an async function component
export default async function ContactPage() {
  // 3. Fetch the global content live from Sanity
  const contactData = await getGlobalContactInfo();

  return (
    <div style={{ marginTop: "1rem" }}>
      {/* 👈 4. Feed the live data directly into your component wrapper */}
      <ContactSection sectionData={contactData} />
    </div>
  );
}
