"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import "../styles/cta.css";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section className="cta" ref={ref}>
      <div className="cta-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          Let's Solve Your Legal Challenges Together and Achieve the Justice You
          Deserve
        </motion.h2>

        <motion.button
          className="cta-button"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          style={{ borderRadius: ".7rem" }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="https://calendly.com/fridmar/meet-with-mey">
            Book a Consultation
          </Link>
        </motion.button>
      </div>
      {/* 
      <div className="cta-features">
        <div className="feature">
          <span className="feature-dot">●</span>
          <p>Artificial Intelligence</p>
        </div>
        <div className="feature-divider">●</div>
        <div className="feature">
          <p>Human Creativity</p>
        </div>
      </div> */}
    </section>
  );
};

export default CTA;
