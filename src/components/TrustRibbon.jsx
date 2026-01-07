"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { urlFor } from "@/lib/sanity";
import "../styles/ribbon.css";

const TrustRibbon = ({ logos }) => {
  const controls = useAnimation();

  if (!logos || logos.length === 0) return null;

  const sortedLogos = [...logos].sort((a, b) =>
    (a.label || "").localeCompare(b.label || "")
  );

  // We use a large multiplier to ensure the user can't easily drag to the "end"
  const duplicatedLogos = [
    ...sortedLogos,
    ...sortedLogos,
    ...sortedLogos,
    ...sortedLogos,
  ];

  const startInfiniteScroll = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30, // Adjust speed
          ease: "linear",
        },
      },
    });
  };

  useEffect(() => {
    startInfiniteScroll();
  }, []);

  const handleDragEnd = () => {
    // Wait 3 seconds after interaction, then resume
    setTimeout(() => {
      startInfiniteScroll();
    }, 3000);
  };

  return (
    <section className="ribbon-section">
      <div className="inner-container">
        <p className="ribbon-label">Recognized & Accredited By</p>

        <div className="ribbon-mask">
          <motion.div
            className="logo-track"
            drag="x"
            animate={controls}
            onDragStart={() => controls.stop()} // Stop auto-scroll when user grabs
            onDragEnd={handleDragEnd} // Resume after 3s
            // Create a large drag area so they don't hit a "wall"
            dragConstraints={{ left: -2000, right: 2000 }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="trust-logo-bg"
                style={{
                  backgroundImage: `url(${urlFor(logo).url()})`,
                }}
                role="img"
                aria-label={logo.label || "Partner Logo"}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustRibbon;
