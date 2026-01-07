import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import PracticeSidebar from "@/components/PracticeSidebar";
import { getMainPractices } from "@/lib/sanity";
import "../../styles/areas.css";

export default async function CityPage({ params }) {
  const { city } = await params;

  // Fetch local content and alphabetical practice list
  const [data, allPractices] = await Promise.all([
    client.fetch(`*[_type == "location" && slug.current == $city][0]`, {
      city,
    }),
    getMainPractices(),
  ]);

  if (!data) return <div className="p-20">Location details coming soon...</div>;

  const sidebarLinks = allPractices
    .map((p) => ({ name: p.title, slug: p.slug }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Forced Alphabetical

  return (
    <main className="city-page">
      <div className="city-hero">
        <h1>{data.seoTitle}</h1>
        <p>
          Expert legal representation for the community of {data.city}, Ontario.
        </p>
      </div>

      <div className="inner-container area-layout">
        <div className="main-content">
          <div className="prose">
            <PortableText value={data.body} />
          </div>
        </div>

        <aside className="sidebar-wrapper">
          <PracticeSidebar practices={sidebarLinks} />
        </aside>
      </div>
    </main>
  );
}
