"use client";
import React from "react";
import Link from "next/link";
import { MapPin, Phone, ArrowDown, Globe, CheckCircle } from "lucide-react";

// 1. Data Object to keep the JSX clean and manageable
const REGIONS = [
  {
    id: "gta",
    title: "Toronto & the Greater Toronto Area (GTA)",
    intro:
      "We regularly act for clients across Toronto and the GTA, where construction activity, redevelopment, and commercial disputes are most concentrated.",
    groups: [
      {
        name: "Toronto",
        cities: [
          "Toronto",
          "Downtown Toronto",
          "North York",
          "Etobicoke",
          "Scarborough",
          "East York",
          "York",
        ],
      },
      {
        name: "York Region",
        cities: [
          "Vaughan (Concord)",
          "Woodbridge",
          "Richmond Hill",
          "Markham",
          "Newmarket",
          "Aurora",
          "King",
          "Stouffville",
        ],
      },
      {
        name: "Peel & Durham",
        cities: [
          "Mississauga",
          "Brampton",
          "Caledon",
          "Ajax",
          "Pickering",
          "Whitby",
          "Oshawa",
        ],
      },
    ],
  },
  {
    id: "simcoe",
    title: "Simcoe County & South Georgian Bay",
    intro:
      "These areas see strong residential development, resort construction, and renovation-related disputes.",
    groups: [
      {
        name: "Key Hubs",
        cities: [
          "Barrie",
          "Innisfil",
          "Orillia",
          "Collingwood",
          "Wasaga Beach",
          "The Blue Mountains",
          "Midland",
          "Alliston",
        ],
      },
    ],
  },
  {
    id: "southwest",
    title: "Southwestern Ontario",
    intro:
      "Serving Windsor-Essex and London with ongoing residential, agricultural, and industrial construction activity.",
    groups: [
      {
        name: "Windsor-Essex",
        cities: [
          "Windsor",
          "LaSalle",
          "Tecumseh",
          "Lakeshore",
          "Amherstburg",
          "Kingsville",
          "Leamington",
        ],
      },
      {
        name: "London & Area",
        cities: [
          "London",
          "Woodstock",
          "St. Thomas",
          "Stratford",
          "Ingersoll",
          "Tillsonburg",
        ],
      },
    ],
  },
  {
    id: "eastern",
    title: "Eastern Ontario",
    intro:
      "Serving clients across Eastern Ontario, including border communities and older housing markets.",
    groups: [
      {
        name: "Main Hubs",
        cities: [
          "Ottawa",
          "Cornwall",
          "Kingston",
          "Belleville",
          "Brockville",
          "Perth",
          "Smiths Falls",
        ],
      },
    ],
  },
];

const AreasWeServe = () => {
  // Simple anchor scroll function
  const scrollToRegion = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for a static header
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <main className="areas-hub">
      {/* HERO SECTION */}
      <section className="areas-hero">
        <div className="container">
          <span className="gold-subtitle">Province-Wide Representation</span>
          <h1>Serving Toronto, the GTA, and Communities Across Ontario</h1>
          <p className="hero-text">
            Based in <strong>Concord (Vaughan)</strong>, Fridmar Law represents
            clients involved in construction disputes, commercial litigation,
            and real estate matters throughout the province.
          </p>
          <div className="hero-btns">
            <button
              onClick={() => scrollToRegion("map-anchor")}
              className="gold-btn"
            >
              Explore Our Service Areas <ArrowDown size={18} />
            </button>
            <Link href="/contact" className="outline-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* MAP & HUB ANCHOR */}
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
              <p>
                Use the map to explore regions or select a quick link below to
                view cities within that area.
              </p>
              <div className="quick-nav-grid">
                {REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => scrollToRegion(region.id)}
                    className="nav-link"
                  >
                    {region.title.split("&")[0]} <ChevronRightIcon />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGIONAL SEO SECTIONS */}
      <section className="regional-breakdown">
        <div className="container">
          {REGIONS.map((region) => (
            <div key={region.id} id={region.id} className="region-card">
              <div className="region-header">
                <h2>{region.title}</h2>
                <p>{region.intro}</p>
              </div>

              <div className="city-lists">
                {region.groups.map((group, idx) => (
                  <div key={idx} className="city-group">
                    <h3>{group.name}</h3>
                    <ul>
                      {group.cities.map((city) => (
                        <li key={city}>
                          <CheckCircle size={14} className="gold-text" /> {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROVINCE WIDE FOOTER */}
      <section className="province-wide-cta">
        <div className="container">
          <h2>Province-Wide Representation</h2>
          <p>
            If your city or town is not listed above, we likely still serve your
            area. Fridmar Law represents clients in rural areas and smaller
            municipalities not specifically named.
          </p>
          <div className="cta-flex">
            <Link href="/contact" className="gold-btn">
              Speak With a Lawyer
            </Link>
            <a href="tel:1234567890" className="phone-btn">
              <Phone size={20} /> (123) 456-7890
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

// Small utility icon
const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default AreasWeServe;
