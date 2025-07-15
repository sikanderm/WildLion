import { Metadata } from "next";

export type Params = { params: { title: string } };

export async function getLionMetadata(params: { title: string }) {
  const { title } = params;

  const spacedTitle = title.replace(/-/g, " ");
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://wildlion.vercel.app/";
  const res = await fetch(`${baseUrl}/Data/liondb.lionprofiles.json`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  const profile = data.find(
    (item: { title: string }) => item.title.trim() === spacedTitle.trim()
  );

  if (!profile) {
    return {
      title: "Lion Not Found | WildLion",
      description: "This lion profile could not be found.",
    };
  }

  return {
    title: `${profile.title} | Lion Profile`,
    description: `Explore the life, history, and sightings of ${profile.title}, a lion from Kruger or Sabi Sands.`,
    alternates: {
      canonical: `https://wildlion.vercel.app/lions/${title}`,
    },
    openGraph: {
      title: `${profile.title} | Lion Profile`,
      description: `Explore the legacy of ${profile.title} including recent sightings, pride info, and related lions.`,
      url: `https://wildlion.vercel.app/lions/${title}`,
      type: "profile",
      images: [
        {
          url: "`https://wildlion.vercel.app/favicon.ico",
          width: 512,
          height: 512,
          alt: profile.title,
        },
      ],
    },
  };
}
