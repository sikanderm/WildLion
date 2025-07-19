"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import "../styles/search.css";

export interface Lion {
  id: string;
  title: string;
  image: string;
  location: string;
  lionsCount: number;
  yearsActive: string;
}

export default function Search() {
  const [data, setData] = useState<Lion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Data/liondb.lions.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const lionsData: Lion[] = await response.json();
        setData(lionsData);
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
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showDropdown =
    isFocused && searchTerm.length > 0 && filteredData.length > 0;

  return (
    <div
      className="search-div"
      style={{
        position: "relative",
        width: "300px",
        height: "70px",
      }}
    >
      <input
        className="search-input"
        type="text"
        placeholder=" Search for lions"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
      />
      {showDropdown && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            borderTop: "none",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 10,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {filteredData.map((item, index) => (
            <li key={index} className="drop-li">
              <Link
                href={`/lions/${encodeURIComponent(
                  item.title.replace(/\s+/g, "-")
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
