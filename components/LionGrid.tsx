"use client";

import React, { useState, useEffect } from "react";
import "../styles/LionGrid.css";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

// Define Lion type
export interface Lion {
  id: string;
  title: string;
  image: string;
  location: string;
  lionsCount: number;
  yearsActive: string;
}

interface LionGridProps {
  initialData: Lion[];
  filter?: string;
}

const getRandomItems = (arr: Lion[], count = 6): Lion[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const LionGrid: React.FC<LionGridProps> = ({
  initialData = [],
  filter = "all",
}) => {
  const [lionData, setLionData] = useState<Lion[]>([]);

  useEffect(() => {
    if (!Array.isArray(initialData) || initialData.length === 0) return;

    let intervalId: NodeJS.Timeout | null = null;

    if (filter === "all") {
      setLionData(initialData);
    } else {
      const updateRandomProfiles = () => {
        const profiles = getRandomItems(initialData, 6);
        setLionData(profiles);
      };

      updateRandomProfiles();
      intervalId = setInterval(updateRandomProfiles, 10000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [initialData, filter]);

  return (
    <div>
      <div className="lion-grid">
        {lionData.map((lion) => (
          <Link
            href={`/lions/${encodeURIComponent(lion.id)}`}
            key={lion.id}
            className="lion-link lion-card"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img src={lion.image} alt={lion.title} className="lion-image" />
            <h3 className="lion-title">{lion.title}</h3>
            <div className="sub-card">
              <p className="lion-info">
                {lion.title?.toLowerCase().includes("pride")
                  ? "A pride"
                  : "A coalition"}{" "}
                of {lion.lionsCount} lions from the {lion.location} active from{" "}
                {lion.yearsActive}
              </p>
              <div style={{ color: "teal", padding: "10px", fontSize: "34px" }}>
                <FaArrowRight />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LionGrid;
