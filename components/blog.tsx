"use client";
import React from "react";
import "../styles/blog.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
              "@type": "Blog",
              name: "WildLion Journal",
              url: "https://thewildlion.org/blog",
            }),
          }}
        />
      </Head>

      <section className="blog-hero">
        <p className="blog-tag">WildLion Journal</p>
        <h1>Coming Soon</h1>
        <p>
          Our blog is being prepared. Check back soon for stories from the field
          and the pride.
        </p>
      </section>
    </div>
  );
}
