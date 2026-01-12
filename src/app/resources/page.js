import PageHero from "@/components/pageHero";
import ResourceGrid from "@/components/ResourceGrid";
import { getCategories } from "@/lib/sanity";
import aboutBg from "@/styles/assets/about.jpg";

export default async function ResourcesPage() {
  const categories = await getCategories(); // Get categories from Sanity
  return (
    <>
      <PageHero
        title="Resources"
        subtitle="Dedicated to providing sophisticated legal solutions with a commitment to excellence and integrity."
        backgroundImage={aboutBg.src} // Replace with your Sanity image if dynamic
      />

      <main className="bodyInner container ">
        <ResourceGrid allCategories={categories} />
      </main>
    </>
  );
}
