import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import * as Icon from "lucide-react";
import "../../../styles/team-profile.css";
import TikTokGallery from "@/components/TikTokGallery";

export default async function TeamProfilePage({ params }) {
  const { slug } = await params;
  const member = await client.fetch(
    `*[_type == "team" && slug.current == $slug][0]`,
    { slug },
  );

  if (!member) return <div>Member not found</div>;

  return (
    <main className="profile-wrapper">
      <div className="inner-container profile-grid">
        {/* Left Side: Photo & Contact */}
        <aside className="profile-aside">
          <img
            src={urlFor(member.image).url()}
            alt={member.name}
            className="profile-img"
          />

          <div className="contact-card">
            <h3>Contact Info</h3>
            <p>
              <Icon.Phone size={16} /> {member.phone}
            </p>
            <p>
              <Icon.Mail size={16} /> {member.email}
            </p>
            <div className="lang-box">
              <strong>Languages:</strong> {member.languages?.join(", ")}
            </div>
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" className="ln-btn">
                LinkedIn Profile
              </a>
            )}
          </div>

          <div className="education-box">
            <h3>Education</h3>
            <ul>
              {member.education?.map((edu, i) => (
                <li key={i}>{edu}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Side: Bio & Memberships */}
        <section className="profile-main">
          <div className="profile-header">
            <h1>{member.name}</h1>
            <p className="role-tag">{member.role}</p>
          </div>

          <div className="bio-content">
            <h2>Meet {member.name.split(" ")[0]}</h2>
            <PortableText value={member.bio} />
          </div>

          {member.tiktokVideo && (
            <div className="video-section">
              {/* Embed TikTok or Video here */}
              <h3>Video Feature</h3>

              <iframe className="tiktok-embed" src={member.tiktokVideo} />
            </div>
          )}

          <div className="memberships-section">
            <h3>Professional Memberships</h3>
            <ul>
              {member.memberships?.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="reels-visibility-block">
        <h3>Featured Insights</h3>
        <p className="reels-subtitle">
          Watch {member.name.split(" ")[0]} discuss recent trends in
          Construction Law.
        </p>

        <div className="tikTokContainer">
          <TikTokGallery urls={member.tiktokReels} />
        </div>

        {/* {member.tiktokReels?.length > 0 && (
          <section className="tikTokContainer">
            <h3>Featured Insights</h3>
            <p className="reels-subtitle">
              Watch {member.name.split(" ")[0]} discuss recent trends in
              Construction Law.
            </p>
            <TikTokGallery urls={member.tiktokReels} />
          </section>
        )} */}
      </section>
    </main>
  );
}
