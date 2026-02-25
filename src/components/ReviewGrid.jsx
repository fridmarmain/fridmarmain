"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { urlFor } from "@/lib/sanity";
import * as Icon from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import "../styles/reviews.css";

const ReviewCard = ({ review, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuxPlaying, setIsMuxPlaying] = useState(false);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const vidId = url.includes("v=")
        ? url.split("v=")[1].split("&")[0]
        : url.includes("shorts/")
          ? url.split("shorts/")[1].split("?")[0]
          : url.split("/").pop();
      return `https://www.youtube.com/embed/${vidId}?autoplay=1&modestbranding=1&rel=0`;
    }
    if (url.includes("tiktok.com")) {
      const id = url.split("/video/")[1]?.split("?")[0];
      // Using the 'v2' embed is standard, but we will crop it with CSS
      return `https://www.tiktok.com/embed/v2/${id}`;
    }
    return url;
  };

  // Update this line
  const isVertical =
    review.videoAspect === "9:16" ||
    review.videoUrl?.includes("shorts") ||
    review.videoUrl?.includes("tiktok.com"); // <--- ADD THIS

  const handlePlayAction = (e) => {
    e.stopPropagation(); // Prevents the click from bubbling
    if (review.videoSource === "upload") {
      setIsMuxPlaying(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const renderStars = (rating) => (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <Icon.Star
          key={i}
          size={14}
          fill={i < rating ? "#ffa908ff" : "transparent"}
          color="#ffa908ff"
        />
      ))}
    </div>
  );

  const clientMeta = (
    <div>
      <div className="client-meta">
        {review.clientImage?.asset && (
          <div
            className="headshot-bg-circle"
            style={{
              backgroundImage: `url(${urlFor(review.clientImage).width(100).height(100).url()})`,
            }}
          />
        )}
        <div className="meta-text">
          <h4 className="client-name">{review.clientName}</h4>
          {review.clientRole && (
            <p className="client-role">{review.clientRole}</p>
          )}
        </div>
      </div>

      <div>{renderStars(review.rating)}</div>
    </div>
  );

  return (
    <>
      {/* GLOBAL CLICK-AWAY OVERLAY (Closes Mux if you click anywhere outside) */}
      <AnimatePresence>
        {isMuxPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mux-reset-overlay"
            onClick={() => setIsMuxPlaying(false)} // This UNMOUNTS the video
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`review-card ${review.reviewType} ${isMuxPlaying ? "active-playing" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
      >
        {review.reviewType === "video" && (
          <div className="video-section">
            <div
              className={`video-stack-container ${review.videoSource === "upload" ? "upload-variant" : "url-variant"}`}
            >
              {/* 1. MUX PLAYER LAYER */}
              <div
                className={`mux-player-wrapper ${isMuxPlaying ? "visible" : "hidden"}`}
              >
                {review.videoSource === "upload" && isMuxPlaying && (
                  <MuxPlayer
                    playbackId={review.muxPlaybackId}
                    metadataVideoTitle={review.clientName}
                    streamType="on-demand"
                    primaryColor="#ffffffe2"
                    accentColor="#ffffff1f"
                    autoPlay={true}
                    maxResolution="720p"
                  />
                )}
              </div>

              <div
                className={`video-facade ${isMuxPlaying ? "fade-out" : ""}`}
                onClick={handlePlayAction}
              >
                <div
                  className={`thumbnail-bg`}
                  style={{
                    // Add optional chaining and a fallback empty string or placeholder
                    backgroundImage: review.videoThumbnail?.asset
                      ? `url(${urlFor(review.videoThumbnail).width(800).auto("format").url()})`
                      : "none",
                    backgroundColor: "#1a1a1a", // Fallback color
                  }}
                />
                <div
                  className={`play-btn-overlay ${isMuxPlaying ? "hidePlay" : " "}`}
                >
                  <Icon.Play size={60} />
                </div>

                <div className=" videoMeta">{clientMeta}</div>
              </div>
            </div>
          </div>
        )}

        {/* ... (Keep Image and Text types as they are) ... */}
        {review.reviewType === "image" && (
          <div className="image-variant">
            <div
              className="review-bg-img"
              style={{
                backgroundImage: review.reviewImage?.asset
                  ? `url(${urlFor(review.reviewImage).width(600).url()})`
                  : "none",
                backgroundColor: "#2a2a2a", // Fallback color if image is null
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!review.reviewImage?.asset && (
                <Icon.ImageOff size={40} color="#555" /> // Optional: show icon if image is missing
              )}
            </div>
            <div className="card-body">
              {clientMeta}
              {review.content && (
                <p className="review-text">"{review.content}"</p>
              )}
            </div>
          </div>
        )}

        {review.reviewType === "text" && (
          <div className="text-variant card-body">
            {clientMeta}
            <p className="review-text standard-quote">"{review.content}"</p>
            <Icon.Quote className="quote-icon" size={40} />
          </div>
        )}
      </motion.div>

      {/* YOUTUBE/SOCIAL MODAL */}
      {isModalOpen && review.videoSource === "url" && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className={`modal-content ${isVertical ? "vertical-modal" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              <Icon.X size={32} />
            </button>
            <div className="video-viewport">
              <iframe
                src={getEmbedUrl(review.videoUrl)}
                allow="autoplay; fullscreen"
                title="Social Review"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function ReviewGrid({ reviews }) {
  if (!reviews) return null;
  return (
    <section className="reviews-container">
      <div className="container">
        <div className="SideHeader">
          <h3 className=""> What Our Clients Say </h3>
        </div>
        <div className="sectionHeader">
          <div className="sectionHeaderRight">
            <h2 className="mainHeader">Reviews</h2>
            <h3 className="">Client Trust</h3>
          </div>

          <div className="sectionHeaderleft">
            <p>
              Discover how our commitment to excellence has helped clients
              achieve their legal goals and find peace of mind.
            </p>
          </div>
        </div>

        <div className="masonry-grid">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review._id || index}
              review={review}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
