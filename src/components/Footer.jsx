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
        {/* Column 1: Branding & Social */}
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
            <a href="https://www.tiktok.com/@fridmarlaw" className="href">
              <svg
                role="img"
                viewBox="0 0 24 24"
                height="20px"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
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
            </a>{" "}
            {/* Using Twitter icon as placeholder for TikTok */}
            <a href="https://www.youtube.com/@FridmarLaw" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
          {/* <Link href="/contact" className="footer-cta-btn">
            Easy Contact Us
          </Link> */}
        </div>

        {/* Column 2: 5 Areas of Focus */}
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
            <li>
              <Link href="/about#team">Team</Link>
            </li>
            <li>
              <Link href="/reviews">Reviews & Testimonials</Link>
            </li>

            {/* <li>
              <Link href="/partner">Partner With Us</Link>
            </li> */}
            {/* <li>
              <Link href="/volunteer">Volunteer Opportunities</Link>
            </li> */}
            {/* <li>
              <Link href="/coop">Co-op Placements</Link>
            </li> */}
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <Link href="/resources/category/blog">Legal Blog</Link>
            </li>
            <li>
              <Link href="/resources/category/vlog"> Vlog </Link>
            </li>
            <li>
              <Link href="/resources/category/podcast">Podcast</Link>
            </li>
            <li>
              <Link href="/resources/category/measure-twice">Youtube</Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Geography */}
        <div className="footer-section">
          <h4>Areas We Serve</h4>

          <ul>
            <li>
              <Link href="/areas-we-serve">Interactive Map</Link>
            </li>
            <li>
              <Link href="/areas-we-serve">Toronto</Link>
            </li>
            {/* <li>
              <Link href="/areas-we-serve ">Ottawa</Link>
            </li> */}
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
