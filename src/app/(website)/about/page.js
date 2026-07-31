import {
  getPosts,
  getMainPractices,
  getTeamMembers,
  getHomepageReviews,
  getPageBySlug,
  getAboutSection, // Fetches the default global content
  getGlobalContactInfo, // 👈 IMPORTED: New global singleton utility
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
import TeamGrid from "@/components/TeamGrid";
import CEOSection from "@/components/CEOSection";

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
  // 1. Fetch data concurrently (injecting the standalone global contact document query)
  const [
    posts,
    practices,
    reviewsData,
    globalAboutData,
    pageData,
    contactData,
  ] = await Promise.all([
    getPosts(),
    getMainPractices(),
    getHomepageReviews(),
    getAboutSection(),
    getPageBySlug("about"),
    getGlobalContactInfo(), // 👈 Fetches the clean, decoupled configuration
  ]);

  // 2. Extracting dynamic layout blocks safely from pageBuilder
  const heroData = pageData?.pageBuilder?.find(
    (section) => section._type === "heroSection",
  );
  const aboutComponentData = pageData?.pageBuilder?.find(
    (section) => section._type === "aboutComponent",
  );
  const ceoSectionData = pageData?.pageBuilder?.find(
    (section) => section._type === "ceoSection",
  );
  const teamSectionData = pageData?.pageBuilder?.find(
    (section) => section._type === "teamSection",
  );
  const reviewSectionData = pageData?.pageBuilder?.find(
    (section) => section._type === "reviewSection",
  );
  const ctaData = pageData?.pageBuilder?.find(
    (section) => section._type === "ctaSection",
  );

  // Fallbacks for array data mappings
  const orderedMembers = teamSectionData?.members || (await getTeamMembers());

  // SMART FALLBACK RESOLVER FOR CORE ABOUT CONTENT:
  const resolvedAboutData = aboutComponentData || globalAboutData;

  return (
    <>
      <PageHero
        title={heroData?.title || "About Our Firm"}
        subtitle={
          heroData?.subtitle ||
          "Dedicated to providing sophisticated legal solutions with a commitment to excellence and integrity."
        }
        backgroundImage={heroData?.backgroundImage || aboutBg.src}
      />

      {/* Renders safely using either the customized layout block or global fallback */}
      <AboutSection data={resolvedAboutData} />

      <CEOSection data={ceoSectionData} />

      {/* Conditional renderer for Team layout layouts */}
      {teamSectionData?.layoutType === "slider" ? (
        <TeamSlider
          headerData={teamSectionData?.header}
          members={orderedMembers}
        />
      ) : (
        <TeamGrid
          headerData={teamSectionData?.header}
          members={orderedMembers}
        />
      )}

      <ReviewGrid sectionData={reviewSectionData} reviews={reviewsData} />

      {/* 👈 Reusable Single Component Instance fueled directly via your global singleton context */}
      <ContactSection sectionData={contactData} />

      <CTA data={ctaData} />
    </>
  );
}
