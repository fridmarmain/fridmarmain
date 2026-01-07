import Hero from "../components/Hero";
import Trust from "../components/Trust";
import ContactSection from "../components/ContactSection";
import Blog from "../components/Blog.jsx";
import CTA from "../components/CTA";
import { getPosts, getMainPractices, getSettings } from "@/lib/sanity";

import "../styles/hero.css";
import "../styles/trust.css";
import "../styles/blog.css";
import "../styles/cta.css";
import "../styles/ContactSection.css";
import Questionnaire from "@/components/Questionnaire";
import PracticeOverview from "@/components/PracticeOverview";
import Announcement from "@/components/Announcement";
import TrustRibbon from "@/components/TrustRibbon";

export default async function HomePage() {
  const posts = await getPosts();
  const practices = await getMainPractices();
  const latestPosts = posts?.slice(0, 4);
  const settings = await getSettings();
  return (
    <>
      <Hero />
      <TrustRibbon logos={settings?.trustLogos} />

      <Trust />
      <ContactSection />
      {/* <Questionnaire /> */}
      <PracticeOverview practices={practices} />
      <Blog posts={latestPosts} />
      <Announcement settings={settings} />
      <CTA />
    </>
  );
}
