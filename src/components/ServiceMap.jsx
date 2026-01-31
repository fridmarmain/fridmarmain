"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Fix for default Leaflet icon
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// A lookup table for Ontario cities
const cityCoords = {
  Toronto: [43.6532, -79.3832],
  "North York": [43.7615, -79.4111],
  "Vaughan (Concord)": [43.792, -79.503],
  Mississauga: [43.589, -79.6441],
  Brampton: [43.7315, -79.7624],
  Markham: [43.8561, -79.337],
  "Richmond Hill": [43.8828, -79.4403],
  Oshawa: [43.8971, -78.8658],
  // Simcoe
  Barrie: [44.3894, -79.6903],
  Collingwood: [44.5008, -80.2169],
  Orillia: [44.6082, -79.4181],
  // Southwest
  London: [42.9849, -81.2453],
  Windsor: [42.3149, -83.0364],
  Woodstock: [43.1306, -80.7467],
  // Eastern
  Ottawa: [45.4215, -75.6972],
  Kingston: [44.2312, -76.486],
  Belleville: [44.1628, -77.3832],
  Cornwall: [45.0213, -74.7303],
};

export default function ServiceMap({ regions }) {
  // Center the map on Ontario
  const ontarioCenter = [44.5, -79.5];

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
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {regions.map((region) =>
          region.groups?.map((group) =>
            group.cities.split(",").map((city) => {
              const trimmedCity = city.trim();

              // 1. Get coordinates from our table, or default to Toronto if not found
              const position = cityCoords[trimmedCity] || null;

              // 2. Only render marker if we have coordinates
              if (!position) return null;

              const slug = trimmedCity
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[()]/g, "");

              return (
                <Marker key={slug} position={position} icon={customIcon}>
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
