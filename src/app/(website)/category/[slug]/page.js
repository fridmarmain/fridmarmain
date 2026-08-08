export const revalidate = 3600;
export const dynamicParams = true;

import { client } from "@/lib/sanity";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

async function getPostsByCategory(categorySlug) {
  // This query finds posts where the category slug matches the URL
  const query = `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    title,
    slug,
    mainImage,
    description,
    "currentCategory": categories[]->{title}[0]
  }`;

  return await client.fetch(query, { categorySlug });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);

  // Get the display name from the first post found, or format the slug
  const categoryDisplayName =
    posts[0]?.currentCategory?.title || slug.replace(/-/g, " ");

  return (
    <main className="category-page py-24">
      <div className="container mx-auto px-6">
        <header className="mb-16 border-l-4 border-gold pl-6">
          <h1 className="text-4xl font-serif capitalize">
            {categoryDisplayName}
          </h1>
          <p className="text-gray-500 mt-2">
            Viewing all legal insights under {categoryDisplayName}
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <div key={post.slug.current} className="itemBlog">
                <Link href={`/blog/${post.slug.current}`}>
                  <div
                    className="eachBlog h-64 bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: `url(${post.mainImage ? urlFor(post.mainImage).url() : "/fallback.jpg"})`,
                    }}
                  ></div>
                </Link>
                <h3 className="titleCont text-xl mt-4 font-bold">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="text-gold mt-4 inline-block font-semibold"
                >
                  Read Insight →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">
              No posts found in this practice area.
            </p>
            <Link href="/" className="mt-4 inline-block text-gold underline">
              Return Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
