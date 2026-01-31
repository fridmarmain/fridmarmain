"use client";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link for internal routing
import "../styles/pageHero.css";

const PageHero = ({
  pageTitle,
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.7,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}) => {
  return (
    <div className="page-hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${backgroundImage || "/default-hero.jpg"})`,
        }}
      >
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
            <span>Home</span> &gt; <span className="current">{pageTitle}</span>
          </nav>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}

          {/* CTA Button Group */}
          <div
            className="hero-ctas"
            style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}
          >
            {primaryCtaLink && (
              <Link href={primaryCtaLink} className="btn-main">
                {primaryCtaText || "Get Started"}
              </Link>
            )}

            {secondaryCtaLink && (
              <Link href={secondaryCtaLink} className="btn-secondary">
                {secondaryCtaText || "Learn More"}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHero;
