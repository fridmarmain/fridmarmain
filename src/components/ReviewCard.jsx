"use client";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import * as Icon from "lucide-react";

export default function ReviewCard({ review, index }) {
  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <Icon.Star key={i} size={14} fill="#c5a059" color="#c5a059" />
    ));
  };

  return (
    <motion.div
      className={`review-card ${review.reviewType}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Video Content */}
      {review.reviewType === "video" && review.videoUrl && (
        <div className="video-container">
          <iframe
            src={review.videoUrl.replace("watch?v=", "embed/")}
            title="Client Review"
          />
        </div>
      )}

      {/* Image Content */}
      {review.reviewType === "image" && review.reviewImage && (
        <img
          src={urlFor(review.reviewImage).url()}
          alt="Client Result"
          className="review-img"
        />
      )}

      <div className="card-body">
        <div className="stars">{renderStars(review.rating)}</div>
        <p className="review-text">"{review.content}"</p>
        <h4 className="client-name">- {review.clientName}</h4>
      </div>
    </motion.div>
  );
}
