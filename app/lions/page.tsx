export const dynamic = "force-dynamic";

import LionGrid from "@/components/LionGrid";
import Head from "next/head";
export const metadata = {
  title: "Featured Lions Kruger & Sabi Sands",
  description:
    "Meet iconic coalitions and lion prides with featured profiles and sighting updates. Explore recent lions sightings from Kruger National Park and Sabi Sands.",
  keywords:
    "Kruger lions, Sabi Sands, lion sightings, lion coalitions, lion prides, African safari, lion profiles, big cats, lions, MalaMala, Londolozi, Mapogo, Majingilane",
  authors: [{ name: "WildLion" }],
  alternates: {
    canonical: "https://thewildlion.org/lions",
  },
  openGraph: {
    title: "Recent Lion Sightings in Kruger & Sabi Sands",
    description:
      "Track the latest lion sightings in Kruger National Park and Sabi Sands. Discover dominant coalitions and lion prides with detailed profiles.",
    url: "https://thewildlion.org/lions",
    type: "website",
    images: [
      {
        url: "https://thewildlion.org/favicon.ico",
        alt: "WildLion",
        width: 512,
        height: 512,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://thewildlion.org/lions"),
};

export default async function Home() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://thewildlion.org/";
  const lionData = await fetch(`${baseUrl}/Data/liondb.lions.json`, {
    next: { revalidate: 60 },
  });
  const lions = await lionData.json();

  return (
    <>
      <div className="home-title">
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                url: "http://localhost:3000/",
                logo: "https://thewildlion.org/favicon.png",
              }),
            }}
          />
        </Head>
        <h1>Wild Lion Profiles</h1>
      </div>
      <LionGrid initialData={lions} filter="all"></LionGrid>
    </>
  );
}
