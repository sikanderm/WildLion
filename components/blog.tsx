"use client";
import React from "react";
import "../styles/blog.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from "next/head";

const posts = [
  {
    title: "Tracking the prides of the Southern Plains",
    excerpt:
      "A closer look at how field researchers document movement, territory, and family bonds across the landscape.",
    tag: "Field Notes",
    date: "June 24, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Why lion conservation depends on community stories",
    excerpt:
      "Conservation is strongest when local voices and wildlife data work together to protect big cats and their habitats.",
    tag: "Conservation",
    date: "June 18, 2026",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "What a lioness teaches us about resilience",
    excerpt:
      "From den sites to survival strategies, lionesses continue to inspire the way we think about leadership and care.",
    tag: "Wildlife",
    date: "June 10, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=80",
  },
];

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
        <h1>Stories from the field and the pride</h1>
        <p>
          Follow the latest updates from lion researchers, conservation
          partners, and the communities helping protect these remarkable
          animals.
        </p>
        <a href="#latest-posts" className="blog-cta">
          Explore stories
        </a>
      </section>

      <section id="latest-posts" className="blog-featured-layout">
        <article
          className="blog-featured-main"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.6), rgba(15, 118, 110, 0.4)), url(${posts[0].image})`,
          }}
        >
          <div className="blog-featured-content">
            <h3>{posts[0].title}</h3>
            <p>{posts[0].excerpt}</p>
            <div className="blog-meta">
              <span>{posts[0].date}</span>
              <span> • </span>
              <span>{posts[0].readTime}</span>
            </div>
          </div>
        </article>

        <div className="blog-featured-side">
          {posts.slice(1).map((post) => (
            <article
              key={post.title}
              className="blog-side-card"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.75), rgba(15, 118, 110, 0.35)), url(${post.image})`,
              }}
            >
              <div className="blog-side-overlay">
                <h3>{post.title}</h3>
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span> • </span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
