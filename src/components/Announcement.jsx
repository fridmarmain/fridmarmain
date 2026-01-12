"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import "../styles/announcement.css";

const Announcement = ({ settings }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!settings?.showAnnouncement) return;

    const hideUntil = localStorage.getItem("announcement_hide_until");
    const now = new Date().getTime();

    if (hideUntil && now < parseInt(hideUntil)) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      // Optional: Prevent scrolling while the popup is open
      document.body.style.overflowY = "hidden";
    }, 4000);

    return () => clearTimeout(timer);
  }, [settings]);

  const closePopup = () => {
    setIsVisible(false);
  };

  const handleRemindLater = () => {
    closePopup();

    document.body.style.overflowY = "auto"; // Restore scrolling
  };

  const handleNeverShow = () => {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date().getTime() + sevenDaysInMs;
    localStorage.setItem("announcement_hide_until", expiryDate.toString());
    closePopup();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="announcement-overlay">
        <motion.div
          className="announcement-modal"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button for quick exit */}
          <button className="close-x" onClick={handleRemindLater}>
            &times;
          </button>

          <div className="modal-inner">
            {settings.announcementImage && (
              <div className="modal-image-container">
                <img
                  src={urlFor(settings.announcementImage).url()}
                  alt="Announcement"
                  className="modal-image"
                />
              </div>
            )}

            <div className="modal-text">
              <h2 className="announcement-badge">
                {settings.announcementHeader}
              </h2>
              <p className="modal-Desc">{settings.announcementDescription}</p>

              <div className="modal-actions">
                {settings.announcementUrl && (
                  <Link
                    href={settings.announcementUrl || "/announcement"}
                    className="btn-main"
                    onClick={closePopup}
                  >
                    Learn More
                  </Link>
                )}

                <div className="modal-footer-links">
                  <button onClick={handleNeverShow} className="link-muted">
                    {settings.announcementNeverShowText || "Don't show again"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Announcement;
