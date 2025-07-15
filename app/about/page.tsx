import About from "@/components/About";

export const metadata = {
  title: "About WildLion",
  description:
    "Learn about WildLion’s mission to document lion lives, promote conservation, and build a passionate community around wildlife storytelling.",
  keywords:
    "WildLion, lion conservation, lion prides, lion coalitions, wildlife community, big cats, Kruger lions, Sabi Sands, lion research",
  authors: [{ name: "WildLion Team" }],
  alternates: {
    canonical: "https://wildlion.vercel.app/about",
  },
  openGraph: {
    title: "About WildLion",
    description:
      "Discover the vision behind WildLion — documenting lion prides and coalitions while connecting a global community of wildlife enthusiasts.",
    url: "https://wildlion.vercel.app/about",
    type: "website",
    images: [
      {
        url: "https://wildlion.vercel.app/favicon.png",
        width: 512,
        height: 512,
        alt: "WildLion Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AboutPage() {
  return (
    <div>
      <About />
    </div>
  );
}
