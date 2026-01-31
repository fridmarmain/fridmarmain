"use client";

import dynamic from "next/dynamic";

// We move the dynamic import here, inside a Client Component
const ServiceMap = dynamic(() => import("./ServiceMap"), {
  ssr: false,
  loading: () => (
    <div
      className="map-placeholder"
      style={{
        height: "500px",
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Loading Interactive Map...</p>
    </div>
  ),
});

export default function MapWrapper({ regions }) {
  return <ServiceMap regions={regions} />;
}
