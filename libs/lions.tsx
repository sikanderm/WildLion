import { Metadata } from "next";

export type Params = { params: { title: string } };

export async function getLionMetadata(params: { title: string }) {
  const { title } = params;

  const spacedTitle = title.replace(/-/g, " ");
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://thewildlion.org/";
  const res = await fetch(`${baseUrl}/Data/liondb.lionprofiles.json`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  const profile = data.find(
    (item: { title: string }) => item.title.trim() === spacedTitle.trim(),
  );

  if (!profile) {
    return {
      title: "Lion Not Found | WildLion",
      description: "This lion profile could not be found.",
    };
  }

  const profileTitle = profile.title.trim().split(" ");
  const name = profileTitle[0];
  const lionType = profileTitle[1];

  if (lionType == "Coalition") {
    return {
      title: `${profile.title}`,
      description: `Explore the life, history, and sightings of ${profile.title}, a group of male lions from Kruger or Sabi Sands.`,
      keywords: [
        profile.title,
        `${name} Males`,
        `${name} Male Lions`,
        `${name} Male`,
        `${name} Lion Coalition`,
        `${name} Lions`,
        "Sabi Sands lions",
        "Kruger lions",
      ],
      alternates: {
        canonical: `https://thewildlion.org/lions/${title}`,
      },
      openGraph: {
        title: `${profile.title} | Lion Profile`,
        description: `Explore the legacy of ${profile.title} including recent sightings, pride info, and related lions.`,
        url: `https://thewildlion.org/lions/${title}`,
        type: "profile",
        images: [
          {
            url: "`https://thewildlion.org/favicon.ico",
            width: 512,
            height: 512,
            alt: profile.title,
          },
        ],
      },
    };
  } else {
    return {
      title: `${profile.title}`,
      description: `Explore the life, history, and sightings of ${profile.title}, a lion from Kruger or Sabi Sands.`,
      keywords: [
        profile.title,
        `${name} Females`,
        `${name} Lionesses`,
        `${name} Lioness`,
        `${name} Pride`,
        `${name} Pride of Lions`,
        "Sabi Sands lions",
        "Kruger lions",
      ],
      alternates: {
        canonical: `https://thewildlion.org/lions/${title}`,
      },
      openGraph: {
        title: `${profile.title}`,
        description: `Explore the legacy of ${profile.title} including recent sightings, pride info, and related lions.`,
        url: `https://thewildlion.org/lions/${title}`,
        type: "profile",
        images: [
          {
            url: "`https://thewildlion.org/favicon.ico",
            width: 512,
            height: 512,
            alt: profile.title,
          },
        ],
      },
    };
  }
}
