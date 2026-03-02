// PATH: /components/MapWrapper.jsx

"use client";
import dynamic from "next/dynamic";

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

export default function MapWrapper({ regions, coordsMap }) {
  return <ServiceMap regions={regions} coordsMap={coordsMap} />;
}
