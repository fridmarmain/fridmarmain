"use client";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { motion } from "framer-motion";
import * as Icon from "lucide-react";

// This is the standalone card component
export const TeamCard = ({ member, index = 0 }) => {
  return (
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
                backgroundImage: `url(${urlFor(member.image)
                  .width(400)
                  .height(500)
                  .url()})`,
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
              <Link className="innerLink" href={`/about/${member.slug}`}>
                <Icon.ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
