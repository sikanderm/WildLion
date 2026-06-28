import Head from "next/head";
import ProfileDisplay from "@/components/Profile";
import { getLionMetadata } from "../../../libs/lions";
type Params = { title: string };

// This function expects a params object wrapped in a promise
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  return getLionMetadata(resolvedParams); // Assuming this handles the shape correctly
}

export default async function DisplayProfile({
  params,
}: {
  params: Promise<Params>;
}) {
  const { title: profileTitle } = await params;
  const spacedTitle = profileTitle.replace(/-/g, " ");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

  //Generate Token
  const tokenRes = await fetch(`${baseUrl}/api/token`, {
    headers: {
      "x-api-key": process.env.API_KEY!,
    },
  });

  if (!tokenRes.ok) {
    throw new Error("Failed to get token");
  }

  const { token } = await tokenRes.json();

  // Call protected API with Bearer token
  const profileData = await fetch(`${baseUrl}/api/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 60 },
  });
  const data = await profileData.json();

  const profile = data.find(
    (item: { title: string }) => item.title.trim() === spacedTitle.trim(),
  );

  // Call protected API with Bearer token
  const sightingData = await fetch(`${baseUrl}/api/sightings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 60 },
  });
  const sighting = await sightingData.json();

  const filterTitle = sighting.filter((s: any) => s.name === profile?.title);

  const sortedSightings = [...filterTitle].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const sightings = sortedSightings.map((s: any, i: number) => ({
    ...s,
    id: sortedSightings.length - i,
  }));

  // Call protected API with Bearer token
  const lionData = await fetch(`${baseUrl}/api/lions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60,
    },
  });

  const lion = await lionData.json();
  const lions = profile?.mentioned
    ? lion.filter(
        (s: { title?: string }) =>
          s.title && profile.mentioned.includes(s.title),
      )
    : [];
  console.log(lions);
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              logo: "https://thewildlion.org/favicon.ico",
            }),
          }}
        />
      </Head>

      <ProfileDisplay
        profileData={profile}
        sightings={sightings}
        lions={lions}
      />
    </>
  );
}
