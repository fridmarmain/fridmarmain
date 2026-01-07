"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import * as Icon from "lucide-react";

const Trust = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const sideItems = [
    {
      id: 1,
      title: "Meet the FPC",
      text: "Learn more about why the FPC is the right fit for you.",
      image: "/courtroom-legal.jpg", // or a CSS class name
      Link: "/about",
    },
    {
      id: 2,
      title: "Our Mission",
      text: `Our Latest Publications
helps our clients stay informed`,
      image: "/legal-documents.jpg",
      Link: "/Blog",
    },
    {
      id: 3,
      title: "Community Impact",
      text: "Contact us to get started on your custom legal strategy.",
      image: "/professional-handshake-legal.jpg",
      Link: "/contact",
    },
  ];

  return (
    <section className="trust " ref={ref}>
      <div className="container">
        <motion.div
          className="trust-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>“GEARING UP TO SERVE YOUR LEGAL NEEDS.”</h2>

          <div className="paraCont">
            <p>
              Welcome to the Fridmar Professional Corporation (the “FPC”), a
              fresh practice ready to engage with your legal needs in the
              construction industry.
            </p>

            {/* <p>
              By combining his legal, educational, and practical knowledge, Mr.
              Fridmar proudly provides all of FPC’s clients with a tailored and
              bespoke solution to their individual legal and business needs
            </p> */}
          </div>
        </motion.div>

        <motion.div
          className="trust-container"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="aboutCeoCont">
            <div className="aboutCeo">
              <div className="ceoCot imageOfCeo">
                <div className="ceoDets"></div>
              </div>

              <div className="ceoBio">
                <div className="aboutCeoBio">
                  <h3>Meet Mr. Fridmar</h3>
                  <p>
                    The FPC, with its zealous leader, aims to provide clients
                    with affordable and creative solutions to even the most
                    complicated of legal problems. By combining his legal,
                    educational, and practical knowledge, Mr. Fridmar proudly
                    provides all of FPC’s clients with a tailored and bespoke
                    solution to their individual legal and business needs.
                  </p>
                </div>
                <button className="  secondaryBtn">
                  <div> Book a call</div>
                  <div className="iconBall">
                    <Icon.ArrowUpRight />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="OtherSide">
            {sideItems.map((item) => (
              <Link href={item.Link} key={item.id} className="sideContainer">
                <div
                  className="sideImage"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>

                <div className="textCont">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>

                <div className="iconFixed">
                  <Icon.ArrowUpRight />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Trust;
