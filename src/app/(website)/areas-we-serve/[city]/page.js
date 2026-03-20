// PATH: /app/areas-we-serve/[city]/page.jsx

import { client, GET_CITY_PAGE_QUERY } from "@/lib/sanity";
import Link from "next/link";
import { Shield, Gavel, MapPin } from "lucide-react";
import CTA from "@/components/CTA";
import "./city.css";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const city = params?.city; // safe optional chaining

  // If no city, return default metadata for the main "Areas We Serve" page
  if (!city) {
    return {
      title: "Areas We Serve | Fridmar Professional Corporation",
      description:
        "Fridmar Professional Corporation proudly serves clients across Ontario, including Toronto and surrounding regions. Our experienced lawyers provide expert legal services in construction law, bankruptcy, real estate litigation, and civil & commercial disputes.",
      openGraph: {
        title: "Areas We Serve | Fridmar Professional Corporation",
        description:
          "Fridmar Professional Corporation proudly serves clients across Ontario, including Toronto and surrounding regions. Our experienced lawyers provide expert legal services in construction law, bankruptcy, real estate litigation, and civil & commercial disputes.",
        url: "https://fridmar.com/areas-we-serve",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      },
      alternates: {
        canonical: "https://fridmar.com/areas-we-serve",
      },
    };
  }

  // Now it's safe to call replace
  const cityName = city.replace(/-/g, " ");

  // Fetch dynamic SEO data
  const { customData, regionData } = await client.fetch(GET_CITY_PAGE_QUERY, {
    citySlug: city,
    cityName,
  });

  const displayName = cityName.replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: customData?.seoTitle || `Construction Lawyers in ${displayName}`,
    description:
      customData?.seoDescription ||
      `Looking for a construction lawyer in ${displayName}? Fridmar Professional Corporation provides expert legal services in construction law, bankruptcy, real estate litigation, and civil & commercial disputes.`,
    openGraph: {
      title: `Areas We Serve | ${displayName}`,
      description:
        customData?.seoDescription ||
        `Fridmar Professional Corporation serves clients in ${displayName}, offering legal expertise in construction, civil, and real estate law.`,
      url: `https://fridmar.com/areas-we-serve/${city}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://fridmar.com/areas-we-serve/${city}`,
    },
  };
}

export default async function CityServicePage({ params }) {
  const { city } = await params;

  const cityNameQuery = city.replace(/-/g, " ");

  const { customData, regionData } = await client.fetch(GET_CITY_PAGE_QUERY, {
    citySlug: city,
    cityName: cityNameQuery,
  });

  const displayName = city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <main className="city-service-page">
      {/* ── HERO ── */}
      <section className="city-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/areas-we-serve">Areas We Serve</Link>
            &nbsp;/&nbsp;{displayName}
          </nav>

          <h1>
            {customData?.customHeadline ||
              `Construction & Civil Litigation Lawyers in ${displayName}`}
          </h1>

          <p className="city-intro">
            {customData?.customIntro ||
              `Expert legal counsel for construction and commercial disputes in ${displayName}. ${regionData?.intro || ""}`}
          </p>

          <Link
            href="https://calendly.com/fridmar/meet-with-mey"
            className="gold-btn"
          >
            Schedule a Consultation in {displayName}
          </Link>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section className="city-expertise">
        <div className="container">
          <div className="expertise-content">
            <span className="expertise-label">Practice Areas</span>

            <h2>Legal Services for the {displayName} Area</h2>

            <p>
              {customData?.localInsights ||
                `We understand the specific regulatory landscape of ${displayName}. Our firm ensures your projects and interests stay protected at every stage.`}
            </p>

            <ul className="service-checklist">
              <li>
                <Shield size={18} />
                Construction Liens in {displayName}
              </li>
              <li>
                <Gavel size={18} />
                Breach of Contract Litigation
              </li>
              <li>
                <MapPin size={18} />
                Providing Services In {regionData?.title || displayName}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
