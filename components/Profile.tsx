export interface Profile {
  id: number;
  title: string;
  url: string;
  intro: string;
  date: string;
  reserve: string;
  mentioned: string[];
  content: {
    type: "text";
    heading: string;
    paragraph: string;
  }[];
}

export interface Lion {
  id: string;
  title: string;
  image: string;
  location: string;
  lionsCount: number;
  yearsActive: string;
}
interface Sighting {
  id: number;
  name: string;
  description: string;
  date: string;
  lat: number;
  lng: number;
  reserve: string;
  location: string;
}

interface ProfileDisplayProps {
  profileData: Profile;
  sightings: Sighting[];
  lions: Lion[];
}

import React from "react";
import "../styles/profile.css";
import ReactMarkdown from "react-markdown";
import InstagramEmbed from "./InstagramEmbed";
import LionMap from "./LionMap";
import RelatedLions from "@/components/RelatedLions";
import SightingsMap from "@/app/sightings/page";
import Head from "next/head";
export default function ProfileDisplay({
  profileData,
  sightings,
  lions,
}: ProfileDisplayProps) {
  return (
    <div className="data-display slide-up">
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
      <div className="title1">
        <h1>{profileData.title}</h1>
      </div>{" "}
      {/*   <div className="title-image">
        {profileData.titleImage && (
          <img src={profileData.titleImage} alt="Title" />
        )}
      </div> */}
      <p className="date">{profileData.date}</p>
      <div className="intro">
        <ReactMarkdown>{profileData.intro}</ReactMarkdown>
      </div>
      {profileData.url && (
        <div className="link-ig">
          <InstagramEmbed key={profileData.url} url={profileData.url} />
        </div>
      )}
      {/* Display content (array with headings, paragraphs, images, and captions) */}
      <div className="content">
        {profileData.content?.map((item, index) => {
          // Check if the item is an object containing heading and paragraph
          if (item.type === "text") {
            return (
              <div key={index} className="text-item">
                <h3>{item.heading}</h3>

                <ReactMarkdown>{item.paragraph}</ReactMarkdown>
              </div>
            );
          }

          return null; // Default return for unknown types
        })}
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          The information was gathered through various public medias such as
          blog pages, forums, and online groups.
        </p>
        <div className="credit">
          <img src="../images/6.jpg" alt="credit img"></img>
          <div className="about-author">
            <p>Sikander Hayat</p>
            <p>writer</p>
            <p>
              I'm a writer and wildlife enthusiast dedicated to tracking and
              documenting the lives of wild lions. Through my work, I aim to
              give readers a deeper understanding of lion behavior, ecology, and
              the challenges they face in a rapidly changing world.
            </p>
          </div>
        </div>
      </div>
      <div className="related-lions">
        <RelatedLions lions={lions} />
      </div>
      <LionMap sightings={sightings} />
    </div>
  );
}
