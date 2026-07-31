import Hero from "@/components/Hero";
import Questionnaire from "@/components/Questionnaire";
import PracticeOverview from "@/components/PracticeOverview";
import AboutSection from "@/components/AboutSection";
import TeamGrid from "@/components/TeamGrid";
import TeamSlider from "@/components/TeamSlider";
import ReviewGrid from "@/components/ReviewGrid";
import Blog from "@/components/Blog.jsx";
import Announcement from "@/components/Announcement";
import CTA from "@/components/CTA";

import {
  getPostForHome,
  getMainPractices,
  getSettings,
  getAboutSection,
  getHomepageReviews,
  getPageBySlug,
} from "@/lib/sanity";

import "../styles/hero.css";
import "../styles/trust.css";
import "../styles/blog.css";
import "../styles/cta.css";
import "../styles/ContactSection.css";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getPostForHome();
  const practices = await getMainPractices();
  const settings = await getSettings();
  const aboutData = await getAboutSection();
  const reviewsData = await getHomepageReviews();

  // 1. Fetching our page layout containing the newly refactored team references
  const pageData = await getPageBySlug("home");

  // 2. Extracting layout blocks safely
  const heroData = pageData?.pageBuilder?.find(
    (section) => section._type === "heroSection",
  );
  const aboutComponentData = pageData?.pageBuilder?.find(
    (section) => section._type === "aboutComponent",
  );
  const ctaData = pageData?.pageBuilder?.find(
    (section) => section._type === "ctaSection",
  );
  const practiceSectionData = pageData?.pageBuilder?.find(
    (section) => section._type === "practiceSection",
  );

  // Find our updated team section block data
  const teamSectionData = pageData?.pageBuilder?.find(
    (section) => section._type === "teamSection",
  );

  const blogSectionData = pageData?.pageBuilder?.find(
    (section) => section._type === "blogSection",
  );

  const reviewSectionData = pageData?.pageBuilder?.find(
    (section) => section._type === "reviewSection",
  );
  // 3. The members are already perfectly sorted in the order the user dragged them!
  const orderedMembers = teamSectionData?.members || [];
  // Slice the posts array dynamically based on user selection setting
  const maxPosts = blogSectionData?.postsCount || 4;
  const filteredPosts = posts?.slice(0, maxPosts) || [];
  const resolvedAboutData = aboutComponentData || globalAboutData;
  return (
    <>
      <Hero data={heroData} />
      <AboutSection data={resolvedAboutData} />
      <PracticeOverview
        sectionData={practiceSectionData}
        practices={practices}
      />

      {/* 4. Rendering layout views seamlessly based on settings choice */}
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

      <Questionnaire />

      <ReviewGrid sectionData={reviewSectionData} reviews={reviewsData} />
      <Blog sectionData={blogSectionData} posts={filteredPosts} />
      <Announcement settings={settings} />
      <CTA data={ctaData} />
    </>
  );
}
