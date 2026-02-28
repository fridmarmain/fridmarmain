"use client";

import { useState } from "react";
import { urlFor } from "@/lib/sanity";
import * as Icon from "lucide-react";

/**
 * Extracts the YouTube video ID from any YouTube URL format:
 *  - https://www.youtube.com/watch?v=ID
 *  - https://youtu.be/ID
 *  - https://youtube.com/shorts/ID?si=...
 *  - https://www.youtube.com/embed/ID
 */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  // Match shorts: /shorts/ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1`;
  }

  // Match standard watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
  }

  // Match youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  }

  // Match already-embed URLs
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) {
    return `https://www.youtube.com/embed/${embedMatch[1]}?autoplay=1`;
  }

  return null;
}

export default function VideoPlayer({ videoUrl, coverImage }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (isPlaying && embedUrl) {
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
        backgroundColor: "#000",
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle darkening overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s",
        }}
        className="overlay-hover"
      />

      {/* Play Button */}
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
