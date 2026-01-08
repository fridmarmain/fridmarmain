"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import * as Icon from "lucide-react";
import "../styles/about.css";

const AboutSection = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  if (!data || !data.bio) return null;

  // Custom components for PortableText
  const components = {
    block: {
      // This logic targets only the VERY FIRST paragraph to highlight words
      normal: ({ children, index }) => {
        if (index === 0 && typeof children[0] === "string") {
          const words = children[0].split(" ");
          const firstFew = words.slice(0, 4).join(" ");
          const rest = words.slice(4).join(" ");
          return (
            <p className="about-p">
              <span className="bio-highlight">{firstFew} </span>
              {rest}
            </p>
          );
        }
        return <p className="about-p">{children}</p>;
      },
    },
  };

  return (
    <section className="aboutPart" ref={ref}>
      <div className="container aboutSection">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="paraCont">
            <p>{data.subtitle}</p>
          </div>
          <h2>{data.title}</h2>
        </motion.div>

        <motion.div
          className="aboutContainer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="aboutSideText">
            <div className="aboutCeoBio">
              {/* This replaces the old <p> tag */}
              <PortableText value={data.bio} components={components} />
            </div>
            <button className="secondaryBtn">
              <div>Learn More</div>
              <div className="iconBall">
                <Icon.ArrowUpRight />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
