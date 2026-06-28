export const dynamic = "force-dynamic";

import { getSightings } from "@/libs/sightings";
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
    canonical: "https://thewildlion.org/sightings",
  },
  openGraph: {
    title: "Recently Reported Sightings of Lions",
    description:
      "Discover dominant lion coalitions and prides with map-based sightings data in Kruger and Sabi Sands.",
    url: "https://thewildlion.org/sightings",
    type: "website",
    images: [
      {
        url: "https://thewildlion.org/favicon.ico",
        width: 512,
        height: 512,
        alt: "WildLion",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://thewildlion.org/sightings"),
};

export default async function Sightings() {
  const sightingData = getSightings();

  const sightings = sightingData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((s, i, arr) => ({
      ...s,
      id: arr.length - i,
    }));
  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://thewildlion.org/sightings",
              logo: "https://thewildlion.org/favicon.png",
            }),
          }}
        />
      </Head>
      <SightingsMap sightings={sightings} />
    </div>
  );
}
