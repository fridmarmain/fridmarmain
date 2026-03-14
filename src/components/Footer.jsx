"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="footer-section">
          <div className="logo-icon">{/* <span>Fridmar Law</span> */}</div>
          <p>
            Professional Legal Solutions for the Construction Industry and
            Beyond.
          </p>
          <div className="social-links">
            <a
              href="https://ca.linkedin.com/company/fridmar-professional-corporation"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@fridmarlaw"
              className="href tiktok-link"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                height="20px"
                fill="#ffffff00"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8217 5.1344C16.0886 4.29394 15.6479 3.19805 15.6479 2H14.7293M16.8217 5.1344C17.4898 5.90063 18.3944 6.45788 19.4245 6.67608C19.7446 6.74574 20.0786 6.78293 20.4266 6.78293V10.2191C18.645 10.2191 16.9932 9.64801 15.6477 8.68211V15.6707C15.6477 19.1627 12.8082 22 9.32386 22C7.50043 22 5.85334 21.2198 4.69806 19.98C3.64486 18.847 2.99994 17.3331 2.99994 15.6707C2.99994 12.2298 5.75592 9.42509 9.17073 9.35079M16.8217 5.1344C16.8039 5.12276 16.7861 5.11101 16.7684 5.09914M6.9855 17.3517C6.64217 16.8781 6.43802 16.2977 6.43802 15.6661C6.43802 14.0734 7.73249 12.7778 9.32394 12.7778C9.62087 12.7778 9.9085 12.8288 10.1776 12.9124V9.40192C9.89921 9.36473 9.61622 9.34149 9.32394 9.34149C9.27287 9.34149 8.86177 9.36884 8.81073 9.36884M14.7244 2H12.2097L12.2051 15.7775C12.1494 17.3192 10.8781 18.5591 9.32386 18.5591C8.35878 18.5591 7.50971 18.0808 6.98079 17.3564"
                  stroke="#ffffffbe"
                  // stroke-linejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/fridmarlaw/"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61575084998241"
              aria-label="facebook"
            >
              <Facebook size={20} />
            </a>

            <a href="https://www.youtube.com/@FridmarLaw" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Practice Areas</h4>
          <ul>
            <li>
              <Link href="/practice/construction-law">Construction Law</Link>
            </li>
            <li>
              <Link href="/practice/disputes">Dispute</Link>
            </li>
            <li>
              <Link href="/practice/litigation">Litigation</Link>
            </li>
            <li>
              <Link href="/practice/more">More</Link>
            </li>
            {/* <li>
              <Link href="/more">More Practice Areas</Link>
            </li> */}
            {/* <li>
              <Link href="/sitemap">Site Map</Link>
            </li> */}
          </ul>
        </div>

        {/* Column 3: Company & Community */}
        <div className="footer-section">
          <h4>About FPC</h4>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/memoriam">Memoriam </Link>
            </li>
            {/* <li>
              <Link href="/about#team">Team</Link>
            </li> */}
            <li>
              <Link href="/reviews">Reviews & Testimonials</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <Link href="/resources/category/blog">Concrete Concepts </Link>
            </li>
            <li>
              <Link href="/resources/category/vlog"> Drill Bit </Link>
            </li>
            <li>
              <Link href="/resources/category/our-podcast">
                #Lawtrepreneurs
              </Link>
            </li>
            <li>
              <Link href="/resources/category/measure-twice">
                Measure Twice
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Areas We Serve</h4>

          <ul>
            <li>
              <Link href="/areas-we-serve">Interactive Map</Link>
            </li>
            <li>
              <Link href="/areas-we-serve">Toronto</Link>
            </li>

            <li>
              <Link href="/areas-we-serve ">Vaughan</Link>
            </li>
            <li>
              <Link href="/areas-we-serve ">Mississauga</Link>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="fridmarFootText">Fridmar</div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            &copy; {new Date().getFullYear()} Fridmar Professional Corporation.
            All rights reserved.
          </p>
          <div className="footer-legal-links">
            <Link href="/terms">Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
