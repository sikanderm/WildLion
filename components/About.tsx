"use client";
import React from "react";
import "../styles/about.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRef, useEffect } from "react";
import Head from "next/head";
export default function About() {
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            if (
              entry.target.isSameNode(valuesRef.current) ||
              entry.target.isSameNode(contactRef.current)
            ) {
              entry.target.classList.add("slide-up");
            } else {
              entry.target.classList.add("slide-in");
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (visionRef.current) observer.observe(visionRef.current);
    if (missionRef.current) observer.observe(missionRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    // If you have other elements to observe, observe them here

    return () => observer.disconnect();
  }, []);

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
      <div className="banner">
        <h1>Our Purpose</h1>
        <div className="under-h2"></div>
        <p>
          Documenting the lives and dynamics of lion prides and coalitions to
          promote wildlife conservation and awareness.
        </p>
      </div>
      <div className="about-section">
        <div className="box1">
          <div className="box1-content">
            <h2>About The Wild Lion</h2>
            <p>
              {" "}
              The Wild Lion was born out of a lifelong fascination with big
              cats—especially lions—and their complex social behavior. Growing
              up, I was captivated by nature documentaries, eagerly watching
              every one I could find. Over time, that childhood curiosity
              evolved into a deeper interest in how these majestic animals live,
              interact, and survive in the wild. This website is my way of
              bringing that passion to life. Wildfact aims to document the lives
              of lion prides and coalitions across different regions,
              highlighting their unique dynamics, territories, and stories.
            </p>
          </div>
        </div>
        <div className="box2">
          <img src="../images/5.jpg" alt="view"></img>
        </div>
      </div>
      <div className="about-mission">
        <div className="am-vision" ref={visionRef}>
          <div className="mission-content">
            <h2>Our Vision</h2>
            <p>
              To inspire global appreciation and protection of big cats by
              deepening our understanding of their social lives, behaviors, and
              habitats.
            </p>
          </div>
        </div>
        <div className="am-mission" ref={missionRef}>
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              Our mission is to educate people on the complexity of lion social
              structures, promoting conservation awareness, creating a digital
              archive that celebrates and preserves the lives of individual
              lions and foster a community of wildlife enthusiasts, researchers,
              and storytellers
            </p>
          </div>
        </div>
      </div>
      <div className="about-values">
        <h2>What We Value</h2>
        <div className="values-section" ref={valuesRef}>
          <div className="value">
            <h3>Conservation</h3> <i className="fas fa-tree value-icon"></i>
            <p>
              Committed to the conservation of big cats through knowledge and
              visibility
            </p>
          </div>
          <div className="value">
            <h3>Sustainability</h3>{" "}
            <i className="fas fa-recycle value-icon"></i>
            <p>Preserving nature’s balance through education and empathy</p>
          </div>
          <div className="value">
            <h3>Compassion</h3> <i className="fas fa-heart value-icon"></i>
            <p>Compassion fuels conservation</p>
          </div>
          <div className="value">
            <h3>Learning</h3>
            <i className="fas fa-book-open value-icon"></i>
            <p>Understanding animal behavior begins with their stories</p>
          </div>
        </div>
      </div>
      <div className="about-contact" ref={contactRef}>
        <h2>Get Involved!</h2>

        <p>
          Join us in celebrating and protecting the majestic lives of lions and
          their ecosystems. Whether you’re a wildlife enthusiast, researcher,
          storyteller, or advocate, your passion and support can make a
          difference. If you'd like to contribute in any way, let us know!
        </p>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
          ></textarea>
          <button type="submit" className="button-link">
            Contact Us
          </button>
        </form>
      </div>
    </div>
  );
}
