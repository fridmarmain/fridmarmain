import {
  getPosts,
  getMainPractices,
  getAboutSection,
  getTeamMembers,
  getReviews,
} from "@/lib/sanity";

import "../../styles/hero.css";
import "../../styles/trust.css";
import "../../styles/blog.css";
import "../../styles/cta.css";
import "../../styles/ContactSection.css";
import AboutSection from "@/components/AboutSection";
import ReviewGrid from "@/components/ReviewGrid";
import CTA from "@/components/CTA";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/pageHero";
import aboutBg from "@/styles/assets/about.jpg";
import TeamSlider from "@/components/TeamSlider";

export default async function AboutPage() {
  const posts = await getPosts();
  const practices = await getMainPractices();
  const latestPosts = posts?.slice(0, 4);
  const aboutData = await getAboutSection();
  const members = await getTeamMembers();
  const reviewsData = await getReviews(4);
  return (
    <>
      <PageHero
        title="About Our Firm"
        subtitle="Dedicated to providing sophisticated legal solutions with a commitment to excellence and integrity."
        backgroundImage={aboutBg.src} // Replace with your Sanity image if dynamic
      />

      <AboutSection data={aboutData} />
      {/* <Trust /> */}

      <TeamSlider members={members} title="Who We Are" />

      {/* <Questionnaire /> */}
      <ReviewGrid reviews={reviewsData} />
      <ContactSection />
      <CTA />
    </>
  );
}
