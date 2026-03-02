"use client";
// PATH: /components/pageHero.jsx

import { motion } from "framer-motion";
import Link from "next/link";
import "../styles/pageHero.css";

const PageHero = ({
  pageTitle,
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.55,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}) => {
  return (
    <div className="page-hero">
      {/* Background image */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${backgroundImage || "/default-hero.jpg"})`,
        }}
      />

      {/* Layered overlays for depth */}
      <div
        className="hero-overlay"
        style={{ backgroundColor: `rgba(10, 8, 5, ${overlayOpacity})` }}
      />
      <div className="hero-overlay-gradient" />
      <div className="hero-grain" />

      {/* Decorative gold top rule */}
      <div className="hero-rule-top" />

      <div className="container hero-content-wrapper">
        <motion.div
          className="hero-text-box"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Breadcrumb */}
          <motion.nav
            className="breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">—</span>
            <span className="current">{pageTitle}</span>
          </motion.nav>

          {/* Animated gold eyebrow line */}
          <motion.div
            className="hero-eyebrow-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          />

          <h1 className="page-title">{title}</h1>

          {subtitle && (
            <motion.p
              className="page-subtitle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTAs */}
          {(primaryCtaLink || secondaryCtaLink) && (
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
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
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom fade into page */}
      <div className="hero-fade-bottom" />
    </div>
  );
};

export default PageHero;
