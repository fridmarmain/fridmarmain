"use client";
import { motion } from "framer-motion";
import InfoBox from "./InfoBox";
const Hero = () => {
  const images = ["img1.jpg", "img2.png", "img3.jpg", "img4.jpg"];
  return (
    <section className="hero" id="home">
      <div className="heroOverLay"></div>

      <div className="hero-content container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Construction Industry Lawyers, Experts Help Anytime.</h1>
        </motion.div>

        <motion.div
          className="hero-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <InfoBox />
        </motion.div>

        <div className="heroBottom">
          <div className="bottomLeft bottItem">
            <p>
              defend any case with a solid understanding of the facts and
              evidence
            </p>
          </div>

          <div className="bottomRight bottItem">
            <div className="peopleCont">
              {" "}
              <div className="peopleInner">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="box"
                    style={{ backgroundImage: `url(${img})` }}
                  ></div>
                ))}
              </div>
              <div className="numbersC">
                <div className="numbers">2.5k+</div>
                <div className="numbers">(4.8)</div>
              </div>
            </div>
            <p>
              "excellent service! The team handled my case smoothly and kept me
              updated"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
