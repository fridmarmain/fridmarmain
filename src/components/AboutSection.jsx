"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import * as Icon from "lucide-react";
import { urlFor } from "@/lib/sanity";
import "../styles/about.css";
import AboutInner from "./AboutInner";

const AboutSection = ({ data }) => {
  const pathname = usePathname();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const isAboutPage = pathname === "/about";

  if (!data || !data.bio) return null;

  const img1Url = data?.image1
    ? urlFor(data.image1).url()
    : "/about/about1.jpg";

  const img2Url = data?.image2
    ? urlFor(data.image2).url()
    : "/about/about2.jpg";

  const components = {
    block: {
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
              <PortableText value={data.bio} components={components} />
            </div>

            {!isAboutPage && (
              <Link href="/about" className="secondaryBtn">
                <div>Learn More</div>
                <div className="iconBall">
                  <Icon.ArrowUpRight />
                </div>
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      <div className="dualImgs container">
        <div
          className="img1"
          style={{ backgroundImage: `url(${img1Url})` }}
        ></div>
        <div
          className="img2"
          style={{ backgroundImage: `url(${img2Url})` }}
        ></div>
      </div>

      {/* Pass structural fields directly inside the nested layout toggle block */}
      {isAboutPage && <AboutInner cardsData={data?.visionMissionCards} />}
    </section>
  );
};

export default AboutSection;
