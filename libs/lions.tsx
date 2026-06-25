import { Metadata } from "next";

export type Params = { params: { title: string } };

export async function getLionMetadata(params: { title: string }) {
  const { title } = params;

  const spacedTitle = title.replace(/-/g, " ");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  const res = await fetch(`${baseUrl}/api/profile`, {
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
  const slug = profile.title.trim().replace(" ", "-");
  const profileTitle = profile.title.trim().split(" ");
  const name = profileTitle.slice(0, -1).join(" ");
  const lionType = profileTitle.join[profileTitle.length - 1];

  if (lionType == "Coalition") {
    return {
      title: `${profile.title}`,
      description: `Explore the life, history, and sightings of ${profile.title}, a ${lionType} of lions from Kruger or Sabi Sands.`,
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
        canonical: `https://thewildlion.org/lions/${slug}`,
      },
      openGraph: {
        title: `${profile.title} | Lion Profile`,
        description: `Explore the legacy of ${profile.title} including recent sightings, pride info, and related lions.`,
        url: `https://thewildlion.org/lions/${title}`,
        type: "profile",
        images: [
          {
            url: "https://thewildlion.org/favicon.ico",
            width: 512,
            height: 512,
            alt: profile.title,
          },
        ],
      },
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: profile.title,
        description: `Explore sightings, history, and territory of ${profile.title}.`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://thewildlion.org/lions/${slug}`,
        },
        author: {
          "@type": "Organization",
          name: "The Wild Lion",
        },
      },
    };
  } else {
    return {
      title: `${profile.title}`,
      description: `Explore the life, history, and sightings of ${profile.title}, a ${lionType} of lions from Kruger or Sabi Sands.`,
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
        canonical: `https://thewildlion.org/lions/${slug}`,
      },
      openGraph: {
        title: `${profile.title}`,
        description: `Explore the legacy of ${profile.title} including recent sightings, pride info, and related lions.`,
        url: `https://thewildlion.org/lions/${title}`,
        type: "profile",
        images: [
          {
            url: "https://thewildlion.org/favicon.ico",
            width: 512,
            height: 512,
            alt: profile.title,
          },
        ],
      },
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: profile.title,
        description: `Explore sightings, history, and territory of ${profile.title}.`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://thewildlion.org/lions/${slug}`,
        },
        author: {
          "@type": "Organization",
          name: "The Wild Lion",
        },
      },
    };
  }
}
