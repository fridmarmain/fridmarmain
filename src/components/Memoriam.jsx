import React from "react";
import Image from "next/image";
import "../styles/fridmar.css";

const Memoriam = () => {
  return (
    <section className="memoriam-section">
      <div className="memoriam-container">
        {/* Header Section */}
        <div className="memoriam-header">
          <span className="memoriam-subtitle">In Memoriam</span>
          <h2 className="memoriam-title">
            — In Memoriam | Main Office Manager —
          </h2>
        </div>

        {/* Centered Image & Dedicated Note */}
        <div className="memoriam-image-block">
          <div className="memoriam-frame">
            <Image
              src="/julia-fridmar.jpg"
              alt="Julia Fridmar"
              width={300}
              height={300}
              className="memoriam-portrait"
            />
          </div>
          <p className="image-note">Julia Fridmar (1945 – 2023)</p>
        </div>

        {/* Biography Content */}
        <div className="memoriam-content">
          <h3 className="bio-title">ABOUT JULIA FRIDMAR</h3>
          <div className="bio-text">
            <p>
              Julia did not live an easy life. Julia went through two
              immigrations, once when she was 19 leaving the USSR to Israel, and
              another when she was 26 moving to Canada. Both times, Julia had to
              start from scratch without any external help or resources.
            </p>
            <p>
              During her life, Julia was an advocate for ongoing learning. She
              earned over a dozen various degrees and certificates ranging in
              nursing, mental health, programing, office administration on one
              end and homeopathic medicine, astrology, and minerology on the
              other. Julia spoke over five languages throughout her life,
              including Esperanto in her youth.
            </p>
            <p>
              Julia had two children, one of whom was Dan Fridmar. Julia
              inspired Dan early on to value education and commit to higher
              learning. Julia encouraged Dan to focus on “doing the right thing”
              and defending those who could not defend themselves. Julia always
              pushed Dan into taking risks and helping create an environment of
              support to help him succeed.
            </p>
            <p className="final-tribute">
              Without Julia, there would be no FPC. She will always be in our
              hearts and in our memory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memoriam;
