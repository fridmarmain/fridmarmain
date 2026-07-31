"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import "../styles/cta.css";

const CTA = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  // Use Sanity dashboard data, falling back seamlessly to historic defaults
  const heading =
    data?.heading ||
    "Let's Solve Your Legal Challenges Together and Achieve the Justice You Deserve";
  const buttonText = data?.buttonText || "Book a Consultation";
  const buttonLink =
    data?.buttonLink || "https://calendly.com/fridmar/schedule-a-consult";

  return (
    <section className="cta" ref={ref}>
      <div className="cta-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          {heading}
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
          <Link href={buttonLink}>{buttonText}</Link>
        </motion.button>
      </div>
    </section>
  );
};

export default CTA;
