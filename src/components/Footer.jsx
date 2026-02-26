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
          <div className="footer-logo">
            <span>Fridmar</span>
          </div>
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
          <Link href="/contact" className="footer-cta-btn">
            Easy Contact Us
          </Link>
        </div>

        {/* Column 2: 5 Areas of Focus */}
        <div className="footer-section">
          <h4>Practice Areas</h4>
          <ul>
            <li>
              <Link href="/prctice/construction">Construction Law</Link>
            </li>
            <li>
              <Link href="/practice/dispute">Dispute</Link>
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
              <Link href="/reviews">Reviews & Testimonials</Link>
            </li>
            {/* <li>
              <Link href="/events">Events & Announcements</Link>
            </li> */}
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
              <Link href="/resources/blog">Legal Blog</Link>
            </li>
            <li>
              <Link href="/resources/vlog">Vlog & Video</Link>
            </li>
            <li>
              <Link href="/resources/podcast">Podcast</Link>
            </li>
            <li>
              <Link href="/resources/youtube">YouTube Channel</Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Geography */}
        <div className="footer-section">
          <h4>Areas We Serve</h4>
          <p className="footer-subtext">
            Providing representation across Ontario.
          </p>
          <ul>
            <li>
              <Link href="/areas-we-serve">Interactive Map</Link>
            </li>
            <li>
              <Link href="/areas-we-serve">Toronto</Link>
            </li>
            <li>
              <Link href="/areas-we-serve ">Ottawa</Link>
            </li>
            <li>
              <Link href="/areas-we-serve ">Hamilton</Link>
            </li>
            <li>
              <Link href="/areas-we-serve ">Mississauga</Link>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            &copy; {new Date().getFullYear()} Fridmar Professional Corporation.
            All rights reserved.
          </p>
          <div className="footer-legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
