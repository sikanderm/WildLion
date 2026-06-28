import Head from "next/head";
import { notFound } from "next/navigation";
import ProfileDisplay from "@/components/Profile";
import { getLionMetadata } from "@/libs/lions";
import { getProfiles } from "@/libs/profile";
import { getSightings } from "@/libs/sightings";
import { getLions } from "@/libs/lionData";

type Params = {
  title: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { title } = await params;
  return getLionMetadata({ title });
}

export default async function DisplayProfile({
  params,
}: {
  params: Promise<Params>;
}) {
  const { title } = await params;

  const spacedTitle = title.replace(/-/g, " ");

  const profileData = getProfiles();

  const profile = profileData.find((item) => item.title.trim() === spacedTitle);
  if (!profile) {
    notFound();
  }

  const sightingData = getSightings();

  const sightings = sightingData
    .filter((s) => s.name === profile.title)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((s, i, arr) => ({
      ...s,
      id: arr.length - i,
    }));

  const lionData = getLions();

  const lions = lionData.filter(
    (lion) => lion.title && profile.mentioned.includes(lion.title),
  );

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
