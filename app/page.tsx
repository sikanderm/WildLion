export const dynamic = "force-dynamic";
import Carousel from "@/components/Carousel";
import LionGrid from "@/components/LionGrid";
import LionMap from "@/components/LionMap";
import Head from "next/head";
import "../styles/Home.css";

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
    canonical: "http://localhost:3000//",
  },
  openGraph: {
    title: "Recent Lion Sightings in Kruger & Sabi Sands",
    description:
      "Track the latest lion sightings in Kruger National Park and Sabi Sands. Discover dominant coalitions and lion prides with detailed profiles.",
    url: "http://localhost:3000//",
    type: "website",
    images: [
      {
        url: "http://localhost:3000//favicon.png",
        width: 512,
        height: 512,
        alt: "The Wild Lion Logo",
      },
    ],
  },
};

export default async function Home() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://wildlion.vercel.app/";
  const sightingData = await fetch(`${baseUrl}/Data/liondb.sightings.json`, {
    next: { revalidate: 60 },
  });
  const sighting = await sightingData.json();

  const sightings = sighting
    .slice(sighting.length - 10, sighting.length)
    .map((s: any, i: number) => ({ ...s, id: 10 - i }));

  const lionData = await fetch(`${baseUrl}/Data/liondb.lions.json`, {
    next: { revalidate: 60 },
  });
  const lion = await lionData.json();

  const lions = lion.slice(0, 10);
  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "http://localhost:3000/",
              logo: "http://localhost:3000//favicon.png",
            }),
          }}
        />
      </Head>
      <div>
        <Carousel></Carousel>
      </div>
      <div className="home-title">
        <h1>Featured Lion Profiles</h1>
      </div>
      <div className="liongrid-container">
        <LionGrid initialData={lions} filter="recent"></LionGrid>
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
