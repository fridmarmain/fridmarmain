"use client";
import { motion } from "framer-motion";

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
          <div className="footer-logo">
            <span className="logo-icon"></span>
            <span>Fridmar</span>
          </div>
          <p>Experience modern legal services tailored to your needs.</p>
        </div>

        <div className="footer-section">
          <h4>About us</h4>
          <ul>
            <li>
              <a href="#about">About LexPoint</a>
            </li>
            <li>
              <a href="#team">Our Team</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#news">News</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Sustainability</h4>
          <ul>
            <li>
              <a href="#env">Environment</a>
            </li>
            <li>
              <a href="#social">Social</a>
            </li>
            <li>
              <a href="#gov">Governance</a>
            </li>
            <li>
              <a href="#report">Report</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#contact">Contact us</a>
            </li>
            <li>
              <a href="#partner">Partners</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="#terms">Terms of Use</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#cookies">Cookie Policy</a>
            </li>
            <li>
              <a href="#disclaimer">Disclaimer</a>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="footer-bottom">
        <p>&copy; 2025 Fridmar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
