import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "../styles/fridmar.css";

const CEOSection = () => {
  return (
    <section className="ceo-section">
      <div className="ceo-container">
        {/* Left Side: Empty wrapper where the CSS handle the images */}
        <div className="ceo-image-wrapper">
          <div className="ceo-bg-decoration"></div>
          <div className="image-frame">
            {/* The portrait is now rendered via the .image-frame::after CSS */}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="ceo-content">
          <span className="ceo-subtitle">Founder & Principal Lawyer</span>
          <h2 className="ceo-quote">
            “GEARING UP TO SERVE YOUR
            <span className="gold-text"> LEGAL NEEDS.</span>”
          </h2>

          <div className="ceo-description">
            <p>
              Welcome to the Fridmar Professional Corporation (the “FPC”) a
              fresh practice ready to engage with your legal needs in the
              construction industry.
            </p>
            <p>
              The FPC, with its zealous leader, aims to provide clients with
              affordable and creative solutions to even the most complicated of
              legal problems.
            </p>
            <p>
              By combining his legal, educational, and practical knowledge, Mr.
              Fridmar proudly provides all of FPC’s clients with a tailored and
              bespoke solution to their individual legal and business needs.
            </p>
          </div>

          <Link href="/consultation" className="ceo-btn">
            Book Consultation <ArrowRight size={20} className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
