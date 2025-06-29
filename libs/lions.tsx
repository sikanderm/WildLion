import { Metadata } from "next";

export type Props = { params: { id: string } };

export async function getLionMetadata(params: { id: string }) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

  const res = await fetch(`${baseUrl}/Data/liondb.lionprofiles.json`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  data.map((lion: { id: string | number }) => ({
    id: lion.id.toString(),
  }));
  const profile = data.find(
    (item: { id: string | number }) => item.id.toString() === id
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
      canonical: `http://localhost:3000//profile/${profile.id}`,
    },
    openGraph: {
      title: `${profile.title} | Lion Profile`,
      description: `Explore the legacy of ${profile.title} including recent sightings, pride info, and related lions.`,
      url: `http://localhost:3000//profile/${profile.id}`,
      type: "profile",
      images: [
        {
          url: "http://localhost:3000//favicon.png",
          width: 512,
          height: 512,
          alt: profile.title,
        },
      ],
    },
  };
}
