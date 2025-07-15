export const dynamic = "force-dynamic";

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
    canonical: "https://wildlion.vercel.app/sightings",
  },
  openGraph: {
    title: "Recently Reported Sightings of Lions",
    description:
      "Discover dominant lion coalitions and prides with map-based sightings data in Kruger and Sabi Sands.",
    url: "https://wildlion.vercel.app/sightings",
    type: "website",
    images: [
      {
        url: "https://wildlion.vercel.app/favicon.png",
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
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://wildlion.vercel.app/";
  const sightingData = await fetch(`${baseUrl}/Data/liondb.sightings.json`, {
    next: { revalidate: 60 },
  });
  const sighting = await sightingData.json();

  const sortedSightings = [...sighting].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const updatedSightings = sortedSightings.map((s, index) => ({
    ...s,
    id: sortedSightings.length - index, // 1 = most recent
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
              url: "https://wildlion.vercel.app/sightings",
              logo: "https://wildlion.vercel.app/favicon.png",
            }),
          }}
        />
      </Head>
      <SightingsMap sightings={updatedSightings} />
    </div>
  );
}
