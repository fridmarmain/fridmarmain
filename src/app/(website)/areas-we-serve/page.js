// PATH: /app/areas-we-serve/page.jsx

import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import "../../styles/areas.css";
import CTA from "@/components/CTA";
import { client, GET_REGIONS_QUERY } from "@/lib/sanity";
import MapWrapper from "@/components/MapWrapper";
import PageHero from "@/components/pageHero";
import { geocodeAllCities } from "@/lib/geocode";
import map from "@/styles/assets/map.jpg";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata() {
  return generateSEO({
    title: "Areas We Serve",
    description:
      "Fridmar Professional Corporation proudly serves clients across Ontario, including Toronto and surrounding regions. Our experienced lawyers provide expert legal services in construction law, bankruptcy, real estate litigation, and civil & commercial disputes.",
    path: "/areas-we-serve",
  });
}

export default async function AreasWeServe() {
  const regions = await client.fetch(GET_REGIONS_QUERY);
  const coordsMap = await geocodeAllCities(regions);

  return (
    <main className="areas-hub">
      <PageHero
        pageTitle="areas-we-serve"
        title="Serving Toronto, the GTA, and Communities Across  "
        subtitle="Based in Concord (Vaughan), Fridmar Law represents clients  ."
        backgroundImage={map.src}
        primaryCtaText="Explore Service Areas"
        primaryCtaLink="#map-anchor"
        secondaryCtaText="Contact Us"
        secondaryCtaLink="https://calendly.com/fridmar/meet-with-mey"
      />

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

      <MapWrapper regions={regions} coordsMap={coordsMap} />
      <CTA />
    </main>
  );
}
