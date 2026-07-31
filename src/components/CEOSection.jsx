import React from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import * as Icon from "lucide-react";
import { urlFor } from "@/lib/sanity";
import "../styles/fridmar.css";

const CEOSection = ({ data }) => {
  // If no dynamic data block is mapped yet, safely back out gracefully
  if (!data) return null;

  // Fallback defaults for custom user text structures
  const subtitle = data.subtitle || "Founder & Principal Lawyer";
  const ctaLabel = data.ctaLabel || "Book Consultation";
  const ctaUrl = data.ctaUrl || "https://calendly.com/fridmar/meet-with-mey";

  // Helper routine to cleanly inject the custom gold-text highlighted spans
  const renderQuote = (text) => {
    if (!text) return "GEARING UP TO SERVE YOUR LEGAL NEEDS.";
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className="gold-text">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // Check if an image was custom-uploaded, otherwise fallback to CSS pseudo-element defaults
  const customImgUrl = data.portraitImage
    ? urlFor(data.portraitImage).url()
    : null;

  return (
    <section className="ceo-section">
      <div className="ceo-container">
        {/* Left Side: Layout frame targeting style controls */}
        <div className="ceo-image-wrapper">
          <div className="ceo-bg-decoration"></div>
          <div
            className="image-frame"
            style={
              customImgUrl
                ? {
                    "--custom-ceo-portrait": `url(${customImgUrl})`,
                    backgroundImage: `url(${customImgUrl})`,
                  }
                : {}
            }
          >
            {/* If a custom image is loaded, inline style maps directly over pseudo variables */}
          </div>
        </div>

        {/* Right Side: Content block output engine */}
        <div className="ceo-content">
          <span className="ceo-subtitle">{subtitle}</span>
          <h2 className="ceo-quote">“{renderQuote(data.quoteText)}”</h2>

          <div className="ceo-description">
            {data.description ? (
              <PortableText value={data.description} />
            ) : (
              <>
                <p>
                  Welcome to the Fridmars Professional Corporation (the “FPC”) a
                  fresh practice ready to engage with your legal needs in the
                  construction industry.
                </p>
                <p>
                  The FPC, with its zealous leader, aims to provide clients with
                  affordable and creative solutions to even the most complicated
                  of legal problems.
                </p>
                <p>
                  By combining his legal, educational, and practical knowledge,
                  Mr. Fridmar proudly provides all of FPC’s clients with a
                  tailored and bespoke solution to their individual legal and
                  business needs.
                </p>
              </>
            )}
          </div>

          <Link
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex" }}
            className="secondaryBtn"
          >
            <div>{ctaLabel}</div>
            <div className="iconBall">
              <Icon.ArrowUpRight />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
