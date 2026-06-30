"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { getLions } from "@/libs/lionData";
import "../styles/search.css";

export interface Lion {
  id: number;
  title: string;
  image: string;
  location: string;
  lionsCount: string;
  yearsActive: string;
}

export default function Search() {
  const [data, setData] = useState<Lion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = () => {
      try {
        const response = getLions();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showDropdown =
    isFocused && searchTerm.length > 0 && filteredData.length > 0;

  return (
    <div className="search-div">
      <input
        className="search-input"
        type="text"
        placeholder="Search for lions"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
      />
      {showDropdown && (
        <ul className="search-dropdown">
          {filteredData.map((item, index) => (
            <li key={index} className="drop-li">
              <Link
                href={`/lions/${encodeURIComponent(
                  item.title.replace(/\s+/g, "-"),
                )}`}
                key={index}
                onClick={() => setSearchTerm("")}
                className="drop-link"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
