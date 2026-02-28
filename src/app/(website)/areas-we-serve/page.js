import React from "react";
import Link from "next/link";
import { Globe, CheckCircle } from "lucide-react";
import "../../styles/areas.css";
import CTA from "@/components/CTA";
import { client, GET_REGIONS_QUERY } from "@/lib/sanity";
import RegionNav from "@/components/RegionNav"; // Import the client part
import MapWrapper from "@/components/MapWrapper";
import PageHero from "@/components/pageHero";
import map from "@/styles/assets/map.jpg";

export default async function AreasWeServe() {
  const regions = await client.fetch(GET_REGIONS_QUERY);

  return (
    <main className="areas-hub">
      {/* HERO SECTION - Updated to use standard anchor or separate client button if needed */}

      <PageHero
        pageTitle="areas-we-serve"
        title="Serving Toronto, the GTA, and Communities Across Ontario"
        subtitle="Based in Concord (Vaughan), Fridmar Law represents clients across Ontario."
        backgroundImage={map.src}
        primaryCtaText="Our Service Areas"
        primaryCtaLink="#map-anchor" // This will handle the scroll
      />

      {/* MAP SECTION */}
      <section className="areas-hero">
        <div className="container">
          <span className="gold-subtitle">Province-Wide Representation</span>
          <h1>Serving Toronto, the GTA, and Communities Across Ontario</h1>
          <p className="hero-text">
            Based in <strong>Concord (Vaughan)</strong>, Fridmar Law represents
            clients across Ontario.
          </p>
          <div className="hero-btns">
            {/* Standard HTML anchor works fine for simple scrolls in Server Components */}
            <a href="#map-anchor" className="gold-btn">
              Explore Our Service Areas
            </a>
            <Link
              href="https://calendly.com/fridmar/meet-with-mey"
              className="outline-btn"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      {/* <section id="map-anchor" className="map-section">
        <div className="container">
          <div className="map-grid">
            <div className="map-visual">
              <div className="interactive-placeholder">
                <Globe size={50} className="gold-text" />
                <p>Interactive Map Integration</p>
              </div>
            </div>
            <div className="map-content">
              <h2>Explore Our Hub</h2>
              <p>Select a region below to view cities within that area.</p>
 
              <RegionNav regions={regions} />
            </div>
          </div>
        </div>
      </section> */}

      {/* REGIONAL BREAKDOWN */}
      <section className="regional-breakdown">
        <div className="container regionalCont">
          {regions.map((region) => (
            <div
              key={region.title}
              className="region-card"
              id={region.title.toLowerCase().replace(/\s+/g, "-")}
            >
              <div className="region-header">
                <h2>{region.title}</h2>
                <p>{region.intro}</p>
              </div>

              <div className="city-lists">
                {region.groups?.map((group, idx) => (
                  <div key={idx} className="city-group">
                    <h3 className="cityHeader">{group.groupName}</h3>
                    <ul>
                      {group.cities.split(",").map((city) => {
                        const trimmedCity = city.trim();
                        const slug = trimmedCity
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[()]/g, "");
                        return (
                          <li className="goldfont" key={trimmedCity}>
                            <CheckCircle size={12} className="gold-text" />
                            <Link href={`/areas-we-serve/${slug}`}>
                              {trimmedCity}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <MapWrapper regions={regions} />
      <CTA />
    </main>
  );
}
