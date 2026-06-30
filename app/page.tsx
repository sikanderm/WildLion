export const dynamic = "force-dynamic";
import Carousel from "@/components/Carousel";
import LionGrid from "@/components/LionGrid";
import LionMap from "@/components/LionMap";
import Head from "next/head";
import "../styles/Home.css";
import { getSightings } from "@/libs/sightings";
import { getLions } from "@/libs/lionData";

export const metadata = {
  title: "Featured Lions and Sightings | Kruger & Sabi Sands",
  description:
    "Meet iconic coalitions and lion prides with featured profiles and sighting updates. Explore recent lions sightings from Kruger National Park and Sabi Sands.",
  keywords: [
    "Wild facts",
    "The Wild Lion",
    "WildFact",
    "The Wild",
    "lions",
    "lion conservation",
    "Kruger lions",
    "Sabi Sands",
    "lion sightings",
    "lion coalitions",
    "lion prides",
    "African safari",
    "lion profiles",
    "big cats",
    "lions",
    "MalaMala",
    "Londolozi",
    "Mapogo",
    "Majingilane",
  ],
  authors: [{ name: "WildLion" }],
  alternates: {
    canonical: "https://thewildlion.org/",
  },
  openGraph: {
    title: "Recent Lion Sightings in Kruger & Sabi Sands",
    description:
      "Track the latest lion sightings in Kruger National Park and Sabi Sands. Discover dominant coalitions and lion prides with detailed profiles.",
    url: "https://thewildlion.org/",
    type: "website",
    images: [
      {
        url: "https://thewildlion.org/favicon.ico",
        width: 512,
        height: 512,
        alt: "The Wild Lion Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://thewildlion.org/"),
};

export default async function Home() {
  const sighting = getSightings();

  const sightings = sighting
    .slice(sighting.length - 10, sighting.length)
    .map((s: any, i: number) => ({ ...s, id: 10 - i }));

  // Call protected API with Bearer token
  const lionData = getLions();

  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://thewildlion.org/",
              logo: "https://thewildlion.org/favicon.png",
            }),
          }}
        />
      </Head>
      <div>
        <Carousel></Carousel>
      </div>
      <div className="home-title">
        <h1>Our Featured Lions</h1>
      </div>
      <div className="liongrid-container">
        <LionGrid initialData={lionData} filter="recent"></LionGrid>
      </div>
      <div className="sighting-title">
        <h2>Recent Sightings</h2>
      </div>{" "}
      <div className="lion-map">
        <LionMap sightings={sightings} />
      </div>
    </div>
  );
}
