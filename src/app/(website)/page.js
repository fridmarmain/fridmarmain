import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import ContactSection from "@/components/ContactSection";
import Blog from "@/components/Blog.jsx";
import CTA from "@/components/CTA";
import {
  getPostForHome,
  getMainPractices,
  getSettings,
  getAboutSection,
  getTeamMembers,
  getHomepageReviews,
} from "@/lib/sanity";

import "../styles/hero.css";
import "../styles/trust.css";
import "../styles/blog.css";
import "../styles/cta.css";
import "../styles/ContactSection.css";
import Questionnaire from "@/components/Questionnaire";
import PracticeOverview from "@/components/PracticeOverview";
import Announcement from "@/components/Announcement";
import TrustRibbon from "@/components/TrustRibbon";
import AboutSection from "@/components/AboutSection";
import TeamGrid from "@/components/TeamGrid";
import ReviewGrid from "@/components/ReviewGrid";
import ResourceGrid from "@/components/ResourceGrid";

export default async function HomePage() {
  const posts = await getPostForHome();
  const practices = await getMainPractices();
  const settings = await getSettings();
  const aboutData = await getAboutSection();
  const members = await getTeamMembers(4);
  const reviewsData = await getHomepageReviews();

  return (
    <>
      <Hero />
      <AboutSection data={aboutData} />
      {/* <TrustRibbon logos={settings?.trustLogos} /> */}
      <PracticeOverview practices={practices} />
      {/* <Trust /> */}
      <TeamGrid members={members} title="Who We Are" />
      {/* <ContactSection /> */}
      <Questionnaire />
      <ReviewGrid reviews={reviewsData} />
      <Blog posts={posts} />
      {/* <ResourceGrid posts={posts} /> */}
      <Announcement settings={settings} />
      <CTA />
    </>
  );
}
