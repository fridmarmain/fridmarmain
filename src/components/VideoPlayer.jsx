"use client";

import { useState } from "react";
import { urlFor } from "@/lib/sanity";
import * as Icon from "lucide-react";

export default function VideoPlayer({ videoUrl, coverImage }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = videoUrl?.replace("watch?v=", "embed/") + "?autoplay=1";

  if (isPlaying) {
    return (
      <div className="video-wrapper">
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "8px",
            border: "none",
          }}
        />
      </div>
    );
  }

  // Generate the image URL if it exists
  const imageUrl = coverImage ? urlFor(coverImage).url() : null;

  return (
    <div
      className="video-decoy"
      onClick={() => setIsPlaying(true)}
      style={{
        position: "relative",
        cursor: "pointer",
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: "8px",
        overflow: "hidden",
        /* Background Image Logic */
        backgroundColor: "#000",
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to darken image slightly so play button pops */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s",
        }}
        className="overlay-hover"
      />

      {/* Play Button Overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(212, 175, 55, 0.9)",
          borderRadius: "50%",
          padding: "20px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        }}
      >
        <Icon.Play size={40} fill="currentColor" />
      </div>
    </div>
  );
}
