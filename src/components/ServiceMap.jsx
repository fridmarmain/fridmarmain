// PATH: /components/ServiceMap.jsx

"use client";
import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ontarioGeoJSON = {
  type: "Feature",
  properties: { name: "Ontario" },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-84.5, 46.0],
        [-83.5, 46.1],
        [-82.5, 45.3],
        [-82.0, 43.0],
        [-82.9, 42.6],
        [-83.1, 42.1],
        [-79.0, 42.7],
        [-76.8, 43.6],
        [-75.5, 44.2],
        [-74.7, 45.0],
        [-74.3, 45.5],
        [-75.0, 46.0],
        [-76.0, 46.5],
        [-77.0, 47.0],
        [-78.0, 48.0],
        [-79.0, 48.5],
        [-80.0, 50.0],
        [-81.0, 51.0],
        [-82.0, 52.0],
        [-83.0, 53.0],
        [-84.0, 54.0],
        [-85.0, 55.0],
        [-86.0, 55.5],
        [-87.0, 56.0],
        [-88.0, 56.5],
        [-89.0, 56.8],
        [-90.0, 57.0],
        [-91.0, 56.8],
        [-92.0, 56.5],
        [-93.0, 56.0],
        [-94.0, 55.0],
        [-95.0, 53.0],
        [-95.2, 52.0],
        [-94.5, 51.0],
        [-93.5, 50.0],
        [-92.0, 49.0],
        [-90.0, 48.5],
        [-88.0, 48.0],
        [-86.5, 47.5],
        [-84.5, 46.9],
        [-84.5, 46.0],
      ],
    ],
  },
};

const ontarioStyle = () => ({
  color: "#c5a059",
  weight: 3,
  opacity: 1,
  fillColor: "#c5a059",
  fillOpacity: 0.08,
});

export default function ServiceMap({ regions, coordsMap = {} }) {
  const ontarioCenter = [44.5, -79.5];

  const markers = useMemo(() => {
    const seen = new Set(); // prevent duplicate pins for same city name

    return regions.flatMap((region, rIdx) =>
      (region.groups ?? []).flatMap((group, gIdx) =>
        (group.cities ?? "")
          .split(",")
          .map((city, cIdx) => {
            const trimmedCity = city.trim();
            const position = coordsMap[trimmedCity];
            if (!position) return null;

            const slug = trimmedCity
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[()]/g, "");

            // Skip if this city name already has a pin
            if (seen.has(slug)) return null;
            seen.add(slug);

            // Key is unique: region index + group index + city index
            const uniqueKey = `${rIdx}-${gIdx}-${cIdx}-${slug}`;

            return { trimmedCity, position, slug, uniqueKey };
          })
          .filter(Boolean),
      ),
    );
  }, [regions, coordsMap]);

  return (
    <div
      style={{
        height: "500px",
        width: "90%",
        maxWidth: "1200px",
        borderRadius: "12px",
        overflow: "hidden",
        margin: "auto",
        marginTop: "60px",
      }}
    >
      <MapContainer
        center={ontarioCenter}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <GeoJSON key="ontario" data={ontarioGeoJSON} style={ontarioStyle} />

        {markers.map(({ trimmedCity, position, slug, uniqueKey }) => (
          <Marker key={uniqueKey} position={position} icon={customIcon}>
            <Popup>
              <div className="popup-content">
                <strong style={{ color: "#c5a059" }}>{trimmedCity}</strong>
                <br />
                <Link
                  href={`/areas-we-serve/${slug}`}
                  style={{ fontSize: "12px", textDecoration: "underline" }}
                >
                  View Local Legal Services
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
