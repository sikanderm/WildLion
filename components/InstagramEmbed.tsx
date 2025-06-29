"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

export default function InstagramEmbed({ url }: { url: string }) {
  const InstagramEmbed = dynamic(() => import("./InstagramEmbed"), {
    ssr: false,
  });
  useEffect(() => {
    // Load Instagram's embed script
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    }
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ background: "#FFF", border: 0, margin: "1em 0", padding: 0 }}
    ></blockquote>
  );
}
