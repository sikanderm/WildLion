import Head from "next/head";
import ProfileDisplay from "@/components/Profile";
import { Metadata } from "next";
import { getLionMetadata } from "../../../libs/lions";
type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  return getLionMetadata(params); // ✅ .id is safely accessible
}
export default async function DisplayProfile(props: { params: Params }) {
  const params = await props.params;
  const rcdId = params.id;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://wildlion.vercel.app/";
  const profileData = await fetch(`${baseUrl}/Data/liondb.lionprofiles.json`, {
    next: { revalidate: 60 },
  });

  const data = await profileData.json();

  const profile = await data.find(
    (item: { id: number | string }) => item.id.toString() === rcdId
  );
  const sightingData = await fetch(`${baseUrl}/Data/liondb.sightings.json`, {
    next: { revalidate: 60 },
  });
  const sighting = await sightingData.json();

  const filterTitle = sighting.filter((s: any) => s.name === profile?.title);

  const sortedSightings = [...filterTitle].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const sightings = sortedSightings.map((s: any, i: number) => ({
    ...s,
    id: sortedSightings.length - i,
  }));

  const lionData = await fetch(`${baseUrl}/Data/liondb.lions.json`, {
    next: { revalidate: 60 },
  });
  const lion = await lionData.json();
  const lions = profile?.mentioned
    ? lion.filter(
        (s: { title?: string }) =>
          s.title && profile.mentioned.includes(s.title)
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
              url: "http://localhost:3000/",
              logo: "http://localhost:3000//favicon.png",
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
