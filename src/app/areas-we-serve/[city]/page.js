import React from "react";
import Link from "next/link";
import { MapPin, Shield, Gavel, ArrowRight } from "lucide-react";

// This function tells Next.js what the "slug" is
export default function CityServicePage({ params }) {
  // Turn "north-york" into "North York" for the UI
  const cityName = params.city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <main className="city-service-page">
      {/* Dynamic SEO Hero */}
      <section className="city-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/areas-we-serve">Areas We Serve</Link> / {cityName}
          </nav>
          <h1>Construction & Civil Litigation Lawyers in {cityName}</h1>
          <p className="city-intro">
            Providing expert legal counsel for contractors, developers, and
            homeowners in the **{cityName}** area. We specialize in resolving
            complex construction disputes and commercial litigation.
          </p>
          <Link href="/contact" className="gold-btn">
            Schedule a Consultation in {cityName}
          </Link>
        </div>
      </section>

      {/* Localized Expertise Section */}
      <section className="city-expertise">
        <div className="container">
          <div className="expertise-grid">
            <div className="expertise-content">
              <h2>Legal Services for the {cityName} Construction Industry</h2>
              <p>
                From lien registrations to contract disputes, our firm
                understands the specific regulatory and business landscape of{" "}
                {cityName}. We ensure your projects stay on track and your legal
                rights are protected.
              </p>
              <ul className="service-checklist">
                <li>
                  <Shield size={18} /> Construction Lien Matters in {cityName}
                </li>
                <li>
                  <Gavel size={18} /> Breach of Contract Litigation
                </li>
                <li>
                  <MapPin size={18} /> Serving all of {cityName} and surrounding
                  areas
                </li>
              </ul>
            </div>

            <div className="local-cta-box">
              <h3>Facing a Dispute in {cityName}?</h3>
              <p>
                Don't let legal hurdles stall your progress. Speak with a
                specialist today.
              </p>
              <Link href="/contact" className="white-btn">
                Contact Our Office <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Link Strategy: Back to Hub */}
      <section className="back-to-hub">
        <div className="container">
          <p>
            We serve all of Ontario. View our{" "}
            <Link href="/areas-we-serve">full list of service areas</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
