import { client, GET_CITY_PAGE_QUERY } from "@/lib/sanity";
import Link from "next/link";
import { Shield, Gavel, MapPin } from "lucide-react";
import CTA from "@/components/CTA";

export default async function CityServicePage({ params }) {
  const { city } = await params;

  // Format slug back to name for the query: "north-york" -> "north york"
  const cityNameQuery = city.replace(/-/g, " ");

  const { customData, regionData } = await client.fetch(GET_CITY_PAGE_QUERY, {
    citySlug: city,
    cityName: cityNameQuery,
  });

  // Display Name formatting: "vaughan" -> "Vaughan"
  const displayName = city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <main className="city-service-page">
      <section className="city-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/areas-we-serve">Areas We Serve</Link> / {displayName}
          </nav>

          <h1>
            {customData?.customHeadline ||
              `Construction & Civil Litigation Lawyers in ${displayName}`}
          </h1>

          <p className="city-intro">
            {customData?.customIntro ||
              `Expert legal counsel for construction and commercial disputes in ${displayName}. ${regionData?.intro || ""}`}
          </p>

          <Link href="/contact" className="gold-btn">
            Schedule a Consultation in {displayName}
          </Link>
        </div>
      </section>

      <section className="city-expertise">
        <div className="container">
          <div className="expertise-grid">
            <div className="expertise-content">
              <h2>Legal Services for the {displayName} Industry</h2>
              <p>
                {customData?.localInsights ||
                  `We understand the specific regulatory landscape of ${displayName}. Our firm ensures your projects stay on track.`}
              </p>
              <ul className="service-checklist">
                <li>
                  <Shield size={18} /> Construction Liens in {displayName}
                </li>
                <li>
                  <Gavel size={18} /> Breach of Contract Litigation
                </li>
                <li>
                  <MapPin size={18} /> Serving all of{" "}
                  {regionData?.title || displayName}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
