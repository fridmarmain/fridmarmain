// const REGIONS = [
//   {
//     id: "gta",
//     title: "Toronto & the Greater Toronto Area (GTA)",
//     intro:
//       "We regularly act for clients across Toronto and the GTA, where construction activity, redevelopment, and commercial disputes are most concentrated.",
//     groups: [
//       {
//         name: "Toronto",
//         cities: [
//           "Toronto",
//           "Downtown Toronto",
//           "North York",
//           "Etobicoke",
//           "Scarborough",
//           "East York",
//           "York",
//         ],
//       },
//       {
//         name: "York Region",
//         cities: [
//           "Vaughan (Concord)",
//           "Woodbridge",
//           "Richmond Hill",
//           "Markham",
//           "Newmarket",
//           "Aurora",
//           "King",
//           "Stouffville",
//         ],
//       },
//       {
//         name: "Peel & Durham",
//         cities: [
//           "Mississauga",
//           "Brampton",
//           "Caledon",
//           "Ajax",
//           "Pickering",
//           "Whitby",
//           "Oshawa",
//         ],
//       },
//     ],
//   },
//   {
//     id: "simcoe",
//     title: "Simcoe County & South Georgian Bay",
//     intro:
//       "These areas see strong residential development, resort construction, and renovation-related disputes.",
//     groups: [
//       {
//         name: "Key Hubs",
//         cities: [
//           "Barrie",
//           "Innisfil",
//           "Orillia",
//           "Collingwood",
//           "Wasaga Beach",
//           "The Blue Mountains",
//           "Midland",
//           "Alliston",
//         ],
//       },
//     ],
//   },
//   {
//     id: "southwest",
//     title: "Southwestern Ontario",
//     intro:
//       "Serving Windsor-Essex and London with ongoing residential, agricultural, and industrial construction activity.",
//     groups: [
//       {
//         name: "Windsor-Essex",
//         cities: [
//           "Windsor",
//           "LaSalle",
//           "Tecumseh",
//           "Lakeshore",
//           "Amherstburg",
//           "Kingsville",
//           "Leamington",
//         ],
//       },
//       {
//         name: "London & Area",
//         cities: [
//           "London",
//           "Woodstock",
//           "St. Thomas",
//           "Stratford",
//           "Ingersoll",
//           "Tillsonburg",
//         ],
//       },
//     ],
//   },
//   {
//     id: "eastern",
//     title: "Eastern Ontario",
//     intro:
//       "Serving clients across Eastern Ontario, including border communities and older housing markets.",
//     groups: [
//       {
//         name: "Main Hubs",
//         cities: [
//           "Ottawa",
//           "Cornwall",
//           "Kingston",
//           "Belleville",
//           "Brockville",
//           "Perth",
//           "Smiths Falls",
//         ],
//       },
//     ],
//   },
// ];
import React from "react";
import Link from "next/link";
import { Globe, CheckCircle } from "lucide-react";
import "../../styles/areas.css";
import CTA from "@/components/CTA";
import { client, GET_REGIONS_QUERY } from "@/lib/sanity";
import RegionNav from "@/components/RegionNav"; // Import the client part
import MapWrapper from "@/components/MapWrapper";

export default async function AreasWeServe() {
  const regions = await client.fetch(GET_REGIONS_QUERY);

  return (
    <main className="areas-hub">
      {/* HERO SECTION - Updated to use standard anchor or separate client button if needed */}
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
            <Link href="/contact" className="outline-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section id="map-anchor" className="map-section">
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

              {/* WE USE THE CLIENT COMPONENT HERE */}
              <RegionNav regions={regions} />
            </div>
          </div>
        </div>
      </section>

      <MapWrapper regions={regions} />

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

      <CTA />
    </main>
  );
}
