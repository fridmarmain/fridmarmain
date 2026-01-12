import ResourceGrid from "@/components/ResourceGrid";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  return (
    <main className="pt-40 pb-20 container mx-auto px-4">
      <ResourceGrid initialCategory={slug} />
    </main>
  );
}
