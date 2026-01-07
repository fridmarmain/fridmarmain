"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import "../styles/announcement.css";

const Announcement = ({ settings }) => {
  if (!settings?.showAnnouncement) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="announcement-bar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.6 }}
      >
        <div className="announcement-inner">
          <div className="announcement-left">
            {settings.announcementImage && (
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={urlFor(settings.announcementImage).url()}
                alt="Announcement"
                className="announcement-thumb"
              />
            )}
            <div className="text-content">
              <span className="announcement-badge">
                {settings.announcementHeader}
              </span>
              <p className="announcement-desc">
                {settings.announcementDescription}
              </p>
            </div>
          </div>

          {settings.announcementBody && (
            <Link href="/announcement" className="announcement-link">
              Read More
            </Link>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Announcement;
