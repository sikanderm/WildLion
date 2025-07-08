"use client";

import React, { useState, useEffect } from "react";
import "../styles/relatedLions.css";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
export interface Lion {
  id: string;
  title: string;
  image: string;
  location: string;
  lionsCount: number;
  yearsActive: string;
}

export default function RelatedLions({ lions }: { lions: Lion[] }) {
  return (
    <div>
      <h3 style={{ fontSize: "20px", textAlign: "center", marginBottom: "0" }}>
        Lions Mentioned in This Article
      </h3>
      <div className="related-grid">
        {lions.map((lion) => (
          <Link
            href={`/lions/${lion.title.split(" ").join("-")}`}
            key={lion.id}
            className="related-link"
          >
            <div className="related-card">
              <img
                src={lion.image}
                alt={lion.title}
                className="related-image"
              />
              <h3 className="related-title">The {lion.title}</h3>
              <div className="related-sub-card">
                {" "}
                <p className="related-info">
                  {lion.title?.toLowerCase().includes("pride")
                    ? "A pride"
                    : "A coalition"}{" "}
                  of {lion.lionsCount} lions from the {lion.location} active
                  from {lion.yearsActive}
                </p>
                <div
                  style={{
                    color: "teal",
                    padding: "10px",
                    fontSize: "24px",
                  }}
                >
                  <FaArrowRight />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
