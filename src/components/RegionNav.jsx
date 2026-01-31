"use client"; // This tells Next.js this part is interactive

import { ChevronRight } from "lucide-react";

export default function RegionNav({ regions }) {
  const scrollToRegion = (id) => {
    // Generate the same ID logic used in the loop
    const sectionId = id
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[()]/g, "");
    const element = document.getElementById(sectionId);

    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="quick-nav-grid">
      {regions.map((region) => (
        <button
          key={region.title}
          onClick={() => scrollToRegion(region.title)}
          className="nav-link"
        >
          {region.title.split("&")[0]}
          <ChevronRight size={16} />
        </button>
      ))}
    </div>
  );
}
