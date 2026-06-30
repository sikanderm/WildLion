"use client";
import React from "react";
import "../styles/about.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRef, useEffect } from "react";
import Head from "next/head";
export default function Blog() {
  return (
    <div className="about-container">
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
      <div>
        <h1>Blog</h1>
      </div>
    </div>
  );
}
