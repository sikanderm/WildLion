import Blog from "@/components/blog";

export const metadata = {
  title: "WildLion Blog",
  description:
    "Explore starter stories from WildLion about lion conservation, field notes, and the lives behind the pride.",
  keywords:
    "WildLion blog, lion conservation, lion stories, wildlife blogging, big cats, lion research",
  authors: [{ name: "WildLion Team" }],
  alternates: {
    canonical: "https://thewildlion.org/blog",
  },
  openGraph: {
    title: "WildLion Blog",
    description:
      "Read new stories from WildLion about lion conservation, field observations, and the people protecting these majestic animals.",
    url: "https://thewildlion.org/blog",
    type: "website",
    images: [
      {
        url: "https://thewildlion.org/favicon.ico",
        width: 512,
        height: 512,
        alt: "WildLion Logo",
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://thewildlion.org/blog"),
};

export default function BlogPage() {
  return (
    <div>
      <Blog />
    </div>
  );
}
