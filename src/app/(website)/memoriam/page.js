import "../../styles/hero.css";
import "../../styles/trust.css";
import "../../styles/blog.css";
import "../../styles/cta.css";
import "../../styles/ContactSection.css";
import CTA from "@/components/CTA";
import PageHero from "@/components/pageHero";
import aboutBg from "@/styles/assets/about.jpg";
import Memoriam from "@/components/Memoriam";

export default async function AboutPage() {
  return (
    <>
      <PageHero
        title="Memoriam"
        subtitle="Honoring the legacy, wisdom, and enduring contributions of those who paved our way."
        //    backgroundImage={aboutBg.src}
      />

      <Memoriam />
      <CTA />
    </>
  );
}
