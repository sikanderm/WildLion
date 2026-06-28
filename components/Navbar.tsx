"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/navbar.css";
import Search from "@/components/Search";
//import Search from "./Search";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Just toggle the menu — no navigation
  };

  const closeMenu = () => setMenuOpen(false);
  const isActive = (href: string): boolean => pathname === href;

  return (
    <nav className="navbar">
      <Link href="/" className="logo-link" onClick={closeMenu}>
        <div className="logo-container">
          <h2>TheWildLion</h2>
        </div>
      </Link>

      <div className="search-box">
        <Search />
      </div>

      <button
        style={{ fontSize: "40px" }}
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {[
          { href: "/", label: "Home" },
          { href: "/lions", label: "Lions" },
          { href: "/sightings", label: "Sightings" },
          { href: "/about", label: "About" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={isActive(href) ? "active" : ""}
              onClick={closeMenu}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
