"use client";

import React from "react";
import Link from "next/link";
import "../styles/footer.css";
import SocialIcons from "./Icons";

const Footer = () => {
  return (
    <footer className="footer">
      <SocialIcons />
      <div className="mission">
        <p>
          Our goal is to create a global network of wildlife sightings that
          helps raise awareness about endangered species and ecosystems. Through
          the power of shared knowledge, we aim to promote the protection of
          natural habitats and foster a deep respect for wildlife conservation.
        </p>
      </div>
      <div className="footer-links">
        <div>
          <Link href="/lions">Lions</Link>
          <Link href="/sightings">Sightings</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
      <p style={{ color: "white" }}>
        All content on this website is for educational and informational
        purposes only
      </p>

      <p className="footer-note">
        &copy; 2025 www.TheWildLion.net. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
