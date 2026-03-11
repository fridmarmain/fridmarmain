"use client";
import { motion } from "framer-motion";
// import Link from "next/link";
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
          <div style={{ color: "#ebebeb" }}>
            Gearing Up To Serve Your Legal Needs.
          </div>
          <h1> Construction Industry Lawyers</h1>
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
          <div className="bottomLeft bottItem" style={{ minWidth: "250px" }}>
            {/* <p style={{}}>
              Fridmar Professional Corporation <br />
              Gearing Up To Serve Your Legal Needs.
            </p>{" "} */}
            {/* <p>gearing up to serve your legal needs.</p> */}
          </div>

          <div className="bottomRight bottItem">
            <div className="peopleCont">
              {" "}
              <a target="_blank" href="https://share.google/0znkPZAkylMiB2P2v">
                <div className="peopleInner">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="box"
                      style={{ backgroundImage: `url(${img})` }}
                    ></div>
                  ))}
                </div>
              </a>
              <div className="numbersC">
                {/* <div className="numbers">2.5k+</div> */}
                <div className="numbers">(5.0)</div>
              </div>
            </div>
            <p>
              " I felt Daniel was responsive, efficient, professional and
              fair/reasonable in fees charged for the work. I "
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
