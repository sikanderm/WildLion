import SightingsMap from "@/components/SightingsMap";
import Head from "next/head";
export const metadata = {
  title: "Lion Sightings | The Wild Lion",
  description:
    "Follow iconic lion coalitions and prides with sightings from Kruger National Park and Sabi Sands.",
  keywords: [
    "Kruger lions",
    "Sabi Sands",
    "lion sightings",
    "lion prides",
    "MalaMala",
    "Londolozi",
    "Mapogo",
    "Majingilane",
    // ...etc
  ],
  authors: [{ name: "WildLion" }],
  alternates: {
    canonical: "http://localhost:3000//sightings",
  },
  openGraph: {
    title: "Recently Reported Sightings of Lions",
    description:
      "Discover dominant lion coalitions and prides with map-based sightings data in Kruger and Sabi Sands.",
    url: "http://localhost:3000//sightings",
    type: "website",
    images: [
      {
        url: "http://localhost:3000//favicon.png",
        width: 512,
        height: 512,
        alt: "WildLion",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Sightings() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

  const sightingData = await fetch(`${baseUrl}/Data/liondb.sightings.json`, {
    next: { revalidate: 60 },
  });
  const sighting = await sightingData.json();

  const sightings = sighting.map((s: any, i: number) => ({ ...s, id: i + 1 }));
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
      <SightingsMap sightings={sightings} />
    </div>
  );
}
