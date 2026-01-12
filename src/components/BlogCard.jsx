"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icon from "lucide-react";
import { urlFor } from "@/lib/sanity";
import "../styles/blogcard.css";

const BlogCard = ({ post }) => {
  // Determine which icon to show based on the format
  const getFormatIcon = (format) => {
    switch (format) {
      case "video":
        return <Icon.PlayCircle size={20} className="text-gold" />;
      case "podcast":
        return <Icon.Mic size={20} className="text-gold" />;
      default:
        return <Icon.FileText size={20} className="text-gray-400" />;
    }
  };

  return (
    <motion.div
      className="blog-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/resources/${post.slug}`}>
        <div
          className="card-image-wrapper"
          style={{
            backgroundImage: `url(${
              post.mainImage
                ? urlFor(post.mainImage).width(600).url()
                : "/fallback-legal.jpg"
            })`,
          }}
        >
          <Icon.ArrowUpRight className="blogRedir" />
          {/* Badge for the first category */}
          {post.categoryTitles && (
            <span className="category-badge">{post.categoryTitles[0]}</span>
          )}
        </div>

        <div className="card-content">
          <div className="card-meta">
            <span className="format-indicator">
              {getFormatIcon(post.format)}
              {typeof post.format === "string"
                ? post.format.toUpperCase()
                : "RESOURCE"}
            </span>
            <span className="post-date">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h3 className="card-title">{post.title}</h3>
          <p className="card-excerpt">
            {post.excerpt || "Explore our latest legal resource..."}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
