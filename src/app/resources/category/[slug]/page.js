import ResourceGrid from "@/components/ResourceGrid";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  return (
    <main className=" categoryInner container ">
      <ResourceGrid initialCategory={slug} />
    </main>
  );
}
