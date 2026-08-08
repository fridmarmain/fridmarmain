export const revalidate = 3600;
export const dynamicParams = true;

import PageHero from "@/components/pageHero";
import ResourceGrid from "@/components/ResourceGrid";
import { getCategoryBySlug } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  // Fetch category data from Sanity including hero fields
  const category = await getCategoryBySlug(slug);

  // Get the hero image URL from Sanity
  const backgroundImage = category?.heroImage
    ? urlFor(category.heroImage).url()
    : null;

  return (
    <>
      <PageHero
        pageTitle={category?.title || "Resources"}
        title={category?.title || "Resources"}
        subtitle={
          category?.heroSubtitle ||
          "Dedicated to providing sophisticated legal solutions with a commitment to excellence and integrity."
        }
        backgroundImage={backgroundImage}
      />

      <main className="categoryInner container">
        <ResourceGrid initialCategory={slug} />
      </main>
    </>
  );
}
