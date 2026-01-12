"use client";
import { motion } from "framer-motion";
import "../styles/pageHero.css";

const PageHero = ({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.5,
}) => {
  return (
    <div className="page-hero">
      {/* Background Image Container */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${backgroundImage || "/default-hero.jpg"})`,
        }}
      >
        {/* Dark Overlay for text legibility */}
        <div
          className="hero-overlay"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        />
      </div>

      <div className="container hero-content-wrapper">
        <motion.div
          className="hero-text-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <nav className="breadcrumb">
            <span>Home</span> / <span className="current">{title}</span>
          </nav>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHero;
