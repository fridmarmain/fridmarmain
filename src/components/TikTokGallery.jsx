"use client";
import "../styles/reels.css";

const TikTokGallery = ({ urls }) => {
  if (!urls || urls.length === 0) return null;

  return (
    <div className="reels-grid">
      {urls.map((url, index) => {
        const videoId = url.split("/video/")[1]?.split("?")[0];
        const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}?autoplay=0`;

        return (
          <div key={index} className="reel-card">
            <iframe
              src={embedUrl}
              className="tiktok-iframe"
              allowFullScreen
              scrolling="no"
              allow="encrypted-media; picture-in-picture"
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};

export default TikTokGallery;
