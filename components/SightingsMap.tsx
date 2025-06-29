"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import Head from "next/head";
import "../styles/sightings.css";
import type { Map } from "leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
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

interface ZoomUpdaterProps {
  zoomLevel: number;
  center: LatLngExpression;
}
const ZoomUpdater: React.FC<ZoomUpdaterProps> = ({ zoomLevel, center }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView(center, zoomLevel);
    }
  }, [zoomLevel, center, map]);

  return null;
};

export default function SightingsMap({ sightings }: { sightings: Sighting[] }) {
  const [filteredSightings, setFilteredSightings] = useState<Sighting[]>([]);

  const [zoom, setZoom] = useState(9);
  const [center, setCenter] = useState<[number, number]>([
    -24.906291035926507, 31.58274945094333,
  ]);
  const [leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);

  const [location, setLocation] = useState(["SabiSands"]);
  const mapRef = useRef<Map | null>(null);

  const allCats = ["Kruger", "SabiSands", "Manyeleti", "Timbavati"];

  const zoomMap: Record<string, [number, [number, number]]> = {
    Kruger: [10, [-25.222144049690256, 31.60813780505653]],
    SabiSands: [11, [-24.820673575967487, 31.48079673898456]],
    Manyeleti: [11, [-24.58125387661373, 31.5276175367362]],
    Timbavati: [10, [-24.36346737381655, 31.268091688051573]],
  };
  const addFilter = (value: string) => {
    setLocation([value]);
    const zoomData = zoomMap[value];

    if (!zoomData) {
      throw new Error(`zoomMap has no entry for key: "${value}"`);
    }

    const [zoomLevel, centerCoords] = zoomData;
    setZoom(zoomLevel);
    setCenter(centerCoords);
  };

  useEffect(() => {
    const filtered = sightings.filter(
      (sighting) => sighting.location === location[0]
    );
    const filteredWithUpdatedId = filtered.map((sighting, index) => ({
      ...sighting,
      id: filtered.length - index,
    }));

    setFilteredSightings(filteredWithUpdatedId);
  }, [location, sightings]);

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

  return (
    <div className="about-container">
      <Head>
        <title>Lion Sightings</title>
        <meta
          name="description"
          content="Follow iconic coalitions and lion prides with reported sightings in the Kruger National Park and Sabi Sands. Explore recent lions found in the Kruger National Park and Sabi Sands."
        />
        <meta
          name="keywords"
          content="Kruger lions, Sabi Sands, lion sightings, lion coalitions, lion prides, African safari, lion profiles, big cats, lions, MalaMala, Londolozi, Mapogo, Majingilane, MalaMala Game Reserve, Londolozi Game Reserve, Lion Sands Game Reserve, Singita Game Reserve, Ulusaba Private Game Reserve, Dulini Game Reserve, Sabi Sabi Game Reserve, Leopard Hills Private Game Reserve, Savanna Private Game Reserve, Arathusa Safari Lodge, Elephant Plains Game Lodge, Inyati Game Lodge, Idube Game Reserve, Nottens Bush Camp, Kirkman's Kamp, Tengile River Lodge, social dynamics"
        />
        <meta name="author" content="WildLion" />
        <link rel="canonical" href="http://localhost:3000//sightings" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Recently Reported Sightings of Lions in Kruger & Sabi Sands"
        />
        <meta
          property="og:description"
          content="Follow the reported sightings of wild lions in Kruger National Park and Sabi Sands. Discover dominant coalitions and long standing lion prides with detailed sighting data."
        />
        <meta property="og:url" content="http://localhost:3000//sightings" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="http://localhost:3000//favicon.png"
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="WildLion" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="home-title">
        <h1>Reported Lion Sightings</h1>
      </div>
      <div className="filter-section">
        <div className="filter-buttons-container">
          {allCats.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${
                location.includes(cat) ? "filter-btn-active" : ""
              }`}
              onClick={() => addFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="map-wrapper slide-up">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "500px", width: "95%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <ZoomUpdater zoomLevel={zoom} center={center} />

          {Array.isArray(sightings) &&
            leaflet &&
            filteredSightings.map((sighting) => {
              if (!sighting.lat || !sighting.lng) return null;

              return (
                <Marker
                  key={sighting.id}
                  position={[sighting.lat, sighting.lng]}
                  icon={
                    new leaflet.DivIcon({
                      className: "marker-icon",
                      html: `<div style="background-color: teal; color: white; text-align: center; border-radius: 50%; width: 20px; height: 20px; line-height: 20px; font-size: 10px;">${sighting.id}</div>`,
                      iconSize: [20, 20],
                      iconAnchor: [10, 10],
                    })
                  }
                >
                  <Popup>
                    <h3>{sighting.name}</h3>
                    <p>
                      {sighting.description} near {sighting.reserve},{" "}
                      {sighting.location}.
                    </p>
                    <p>
                      <strong>Date:</strong> {sighting.date}
                    </p>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </div>
  );
}
