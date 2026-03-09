import PageHero from "@/components/pageHero";
import ResourceGrid from "@/components/ResourceGrid";
import aboutBg from "@/styles/assets/about.jpg";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  return (
    <>
      <PageHero
        title="Resources"
        subtitle="Dedicated to providing sophisticated legal solutions with a commitment to excellence and integrity."
        backgroundImage={aboutBg.src} // Replace with your Sanity image if dynamic
      />

      <main className=" categoryInner container ">
        <ResourceGrid initialCategory={slug} />
      </main>
    </>
  );
}
