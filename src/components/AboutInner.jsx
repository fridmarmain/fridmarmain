"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import * as Icon from "lucide-react";
import "../styles/about.css";

const VisionMission = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const isAboutPage = pathname === "/about";

  const vmvContent = [
    {
      id: "vision",
      label: "VISION",
      text: `A dedicated construction industry law firm who helps individuals and businesses in Ontario receive the quality of work that they expect and collect payment for good work performed.`,
      wide: false,
    },
    {
      id: "mission",
      label: "MISSION",
      text: `To provide our clients with affordable and creative solutions tailored to their individual legal and business needs.`,
      wide: false,
    },
    {
      id: "values",
      label: "VALUES",
      subtitle: "Cost-efficiency, Creativity, and Confidence",
      text: `Our core values include cost-efficiency, creativity, and confidence:
We understand that litigation, with its complexities and unknowns, might become a major source of stress in the lives of many clients. As such, we hope to inspire confidence in our clients to rest easy and trust that the FPC has their cases under control.`,
      wide: true,
    },
  ];

  return (
    <section className="vmv-section" ref={containerRef}>
      <div className="container vmv-flex-container">
        {" "}
        {/* Updated class here */}
        {vmvContent.map((item, index) => (
          <motion.div
            key={item.id}
            className={`vmv-card ${item.wide ? "vmv-wide" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <span className="vmv-label">{item.label}</span>
            {item.subtitle && <h3 className="vmv-subtitle">{item.subtitle}</h3>}
            <p className="vmv-text">{item.text}</p>

            {item.id === "values" && !isAboutPage && (
              <button className="secondaryBtn vmv-btn">
                <div>Learn More</div>
                <div className="iconBall">
                  <Icon.ArrowUpRight />
                </div>
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VisionMission;
