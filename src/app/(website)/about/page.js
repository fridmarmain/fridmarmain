import {
  getPosts,
  getMainPractices,
  getAboutSection,
  getTeamMembers,
  getHomepageReviews,
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
import CEOSection from "@/components/CEOSection";
// import Memoriam from "@/components/Memoriam";

export async function generateMetadata() {
  return {
    title: "About Our Firm",
    description:
      "Learn more about Fridmar Professional Corporation, our team, and our commitment to delivering expert legal solutions in construction, litigation, and real estate law.",
    openGraph: {
      title: "About Our Firm | Fridmar Professional Corporation",
      description:
        "Meet the team and discover the values behind Fridmar Professional Corporation.",
      url: "https://fridmar.com/about",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: "https://fridmar.com/about",
    },
  };
}

export default async function AboutPage() {
  const posts = await getPosts();
  const practices = await getMainPractices();
  const latestPosts = posts?.slice(0, 4);
  const aboutData = await getAboutSection();
  const members = await getTeamMembers();
  const reviewsData = await getHomepageReviews();
  return (
    <>
      <PageHero
        title="About Our Firm"
        subtitle="Dedicated to providing sophisticated legal solutions with a commitment to excellence and integrity."
        backgroundImage={aboutBg.src} // Replace with your Sanity image if dynamic
      />

      <AboutSection data={aboutData} />
      {/* <Trust /> */}

      <CEOSection />

      <TeamSlider members={members} title="Who We Are" />

      {/* <Questionnaire /> */}
      <ReviewGrid reviews={reviewsData} />
      <ContactSection />

      {/* <Memoriam /> */}
      <CTA />
    </>
  );
}
