"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

interface Sighting {
  id: number;
  name: string;
  description: string;
  date: string;
  lat: number;
  lng: number;
  reserve: string;
  location: string;
}

export default function LionMap({ sightings }: { sightings: Sighting[] }) {
  const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
        iconUrl: "/leaflet/images/marker-icon.png",
        shadowUrl: "/leaflet/images/marker-shadow.png",
      });
      setLeaflet(L);
    });
  }, []);

  if (!leaflet) return <p>Loading map...</p>;

  return (
    <MapContainer
      center={[-24.820673575967487, 31.48079673898456]}
      zoom={11}
      style={{
        height: "500px",
        width: "85%",
        margin: "0 auto",
        backgroundColor: "white",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {sightings.map((s) => (
        <Marker
          key={s.id}
          position={[s.lat, s.lng]}
          icon={
            new leaflet.DivIcon({
              className: "custom-icon",
              html: `<div style="background-color: teal; color: white; border-radius: 50%; width: 22px; height: 22px; line-height: 22px; font-size: 11px; text-align: center;">${s.id}</div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })
          }
        >
          <Popup>
            <div style={{ minWidth: "180px", fontFamily: "Arial, sans-serif" }}>
              <h3
                style={{
                  margin: "0 0 6px",
                  color: "#0f766e",
                  fontSize: "15px",
                }}
              >
                {s.name}
              </h3>
              <p
                style={{ margin: "0 0 6px", color: "#374151", lineHeight: 1.4 }}
              >
                {s.description} near {s.reserve}, {s.location}.
              </p>
              <p style={{ margin: 0, color: "#4b5563", fontSize: "13px" }}>
                <strong>Date:</strong>{" "}
                {new Date(s.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
