"use client";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { motion } from "framer-motion";
import "../styles/team-grid.css";
import * as Icon from "lucide-react";

const TeamGrid = ({ members, title = "Meet Our Team" }) => {
  if (!members || members.length === 0) return null;

  return (
    <section className="team-grid-section">
      <div className="container">
        <div className="SideHeader">
          <h3 className=" ">Strategy That Delivers </h3>
        </div>
        <div className="sectionHeader">
          <div className="sectionHeaderRight">
            <h2 className="mainHeader">Our Team</h2>
            <h3 className=" ">Meet the specialists</h3>
          </div>

          <div className="sectionHeaderleft">
            <p>
              Clear counsel, zero legalese. From the courtroom to social media,
              meet the team moving your case forward.
            </p>
          </div>
        </div>

        <div className="members-wrapper">
          {members.map((member, index) => (
            <motion.div
              key={member.slug}
              className="member-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="member-link">
                <div className="image-container">
                  {member.image ? (
                    <div
                      className="member-photo-bg"
                      style={{
                        backgroundImage: `url(${urlFor(member.image).width(400).height(500).url()})`,
                      }}
                      aria-label={member.name}
                    />
                  ) : (
                    <div className="image-placeholder" />
                  )}

                  <div className="member-info">
                    <div>
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>

                    <div className="aboutLink">
                      <Link
                        className="innerLink"
                        href={`/about/${member.slug}`}
                      >
                        <Icon.ArrowUpRight />{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
