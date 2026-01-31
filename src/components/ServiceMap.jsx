"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Fix for default Leaflet icon disappearing in Next.js
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ServiceMap({ regions }) {
  // 1. Flatten the Sanity data into a list of pins
  // Ideally, your Sanity data would include lat/lng for each city.
  // For this demo, I'm using a placeholder center (Ontario)
  const ontarioCenter = [43.6532, -79.3832];

  return (
    <div
      className="map-wrapper"
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={ontarioCenter}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {regions.map((region) =>
          region.groups?.map((group) =>
            group.cities.split(",").map((city) => {
              const trimmedCity = city.trim();
              const slug = trimmedCity
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[()]/g, "");

              // Placeholder logic: In production, you'd pull real lat/lng from Sanity
              // For now, this renders the logic of the dynamic link
              return (
                <Marker key={slug} position={ontarioCenter} icon={customIcon}>
                  <Popup>
                    <div className="popup-content">
                      <strong style={{ color: "#c5a059" }}>
                        {trimmedCity}
                      </strong>
                      <br />
                      <Link
                        href={`/areas-we-serve/${slug}`}
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                        }}
                      >
                        View Local Legal Services
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            }),
          ),
        )}
      </MapContainer>
    </div>
  );
}
