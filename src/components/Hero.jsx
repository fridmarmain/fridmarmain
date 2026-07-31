"use client";
import { motion } from "framer-motion";
import InfoBox from "./InfoBox";
import { urlFor } from "@/lib/sanity";

const Hero = ({ data }) => {
  const heading = data?.heading || "Construction Industry Lawyers";
  const subheading =
    data?.subheading || "Gearing Up To Serve Your Legal Needs.";

  const bgUrl = data?.backgroundImage ? urlFor(data.backgroundImage).url() : "";
  const heroStyle = bgUrl ? { backgroundImage: `url(${bgUrl})` } : {};

  // Extract the info link items safely to hand down
  const infoLinksData = data?.infoLinks;

  return (
    <section className="hero" id="home" style={heroStyle}>
      <div className="heroOverLay"></div>

      <div className="hero-content container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>{heading}</h1>

          <div style={{ color: "#ebebeb", fontSize: "14px" }}>{subheading}</div>
        </motion.div>

        <motion.div
          className="hero-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Pass the dynamic link data array straight through */}
          <InfoBox links={infoLinksData} />
        </motion.div>

        <div className="heroBottom">
          <div
            className="bottomLeft bottItem"
            style={{ minWidth: "250px" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
