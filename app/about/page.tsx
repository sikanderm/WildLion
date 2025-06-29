import About from "@/components/About";

export const metadata = {
  title: "About Wildfact",
  description:
    "Learn about Wildfact’s mission to document lion lives, promote conservation, and build a passionate community around wildlife storytelling.",
  keywords:
    "Wildfact, lion conservation, lion prides, lion coalitions, wildlife community, big cats, Kruger lions, Sabi Sands, lion research",
  authors: [{ name: "Wildfact Team" }],
  alternates: {
    canonical: "http://localhost:3000//about",
  },
  openGraph: {
    title: "About Wildfact",
    description:
      "Discover the vision behind Wildfact — documenting lion prides and coalitions while connecting a global community of wildlife enthusiasts.",
    url: "http://localhost:3000//about",
    type: "website",
    images: [
      {
        url: "http://localhost:3000//favicon.png",
        width: 512,
        height: 512,
        alt: "Wildfact Logo",
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
