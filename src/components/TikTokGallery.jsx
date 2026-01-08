"use client";
import "../styles/reels.css";

const TikTokGallery = ({ urls }) => {
  if (!urls || urls.length === 0) return null;

  return (
    <div className="reels-grid">
      {urls.map((url, index) => {
        // TikTok URLs usually look like: tiktok.com/@user/video/ID
        // We need to convert them to embed URLs
        const videoId = url.split("/video/")[1]?.split("?")[0];
        const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;

        return (
          <div key={index} className="reel-card">
            <iframe
              src={embedUrl}
              className="tiktok-iframe"
              allowFullScreen
              scrolling="no"
              allow="autoplay; encrypted-media; picture-in-picture"
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};

export default TikTokGallery;
