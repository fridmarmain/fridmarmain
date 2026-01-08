"use client";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import * as Icon from "lucide-react";
import "../styles/reviews.css";

const ReviewCard = ({ review, index }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Icon.Star
        key={i}
        size={14}
        fill={i < rating ? "#c5a059" : "transparent"}
        color="#c5a059"
      />
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
      {/* 1. VIDEO TYPE */}
      {review.reviewType === "video" && review.videoUrl && (
        <div className="video-container">
          <iframe
            src={review.videoUrl.replace("watch?v=", "embed/")}
            title="Client Review"
            allowFullScreen
          />
        </div>
      )}

      {/* 2. IMAGE TYPE (Background Div instead of <img>) */}
      {review.reviewType === "image" && review.reviewImage && (
        <div
          className="review-bg-img"
          style={{
            backgroundImage: `url(${urlFor(review.reviewImage).width(600).url()})`,
          }}
        />
      )}

      <div className="card-body">
        <div className="client-meta">
          {review.clientImage && (
            <div
              className="headshot-bg-circle"
              style={{
                backgroundImage: `url(${urlFor(review.clientImage).width(100).height(100).url()})`,
              }}
            />
          )}
          <div className="meta-text">
            <h4 className="client-name">{review.clientName}</h4>
            <div className="stars">{renderStars(review.rating)}</div>
          </div>
        </div>

        <p className="review-text">"{review.content}"</p>
      </div>
    </motion.div>
  );
};

export default function ReviewGrid({ reviews }) {
  if (!reviews) return null;
  return (
    <section className="reviews-container">
      <div className="masonry-grid">
        {reviews.map((review, index) => (
          <ReviewCard key={review._id || index} review={review} index={index} />
        ))}
      </div>
    </section>
  );
}
