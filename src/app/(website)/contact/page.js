import ContactSection from "@/components/ContactSection";

import React from "react";

import { generateSEO } from "@/lib/seo";

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

function ContactPage() {
  return (
    <div style={{ marginTop: "1rem" }}>
      <ContactSection />{" "}
    </div>
  );
}

export default ContactPage;
