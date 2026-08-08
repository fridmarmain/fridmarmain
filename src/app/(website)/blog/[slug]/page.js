export const revalidate = 3600;
export const dynamicParams = true;

import { getSinglePost } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

import "./blog.css";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const post = await getSinglePost(slug);

  if (!post) {
    return generateSEO({
      title: "Post Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
    });
  }

  const image = post.mainImage ? urlFor(post.mainImage).url() : "/og-image.png";

  return generateSEO({
    title: post.title,
    description:
      post.excerpt ||
      post.description ||
      "Read expert legal insights from Fridmar Professional Corporation on construction, litigation, and real estate law.",
    path: `/blog/${slug}`,
    image,
  });
}
export default async function PostPage({ params }) {
  // 1. You MUST await params in Next.js 15
  const { slug } = await params;

  // 2. Now slug has a value, so the GROQ query won't fail
  const post = await getSinglePost(slug);

  if (!post) {
    return <div className="container">Post not found</div>;
  }

  return (
    <article className="post-page py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {post.mainImage && (
          <div
            className="blogImgCont"
            style={{
              // 2. Use urlFor for Sanity images
              backgroundImage: `url(${post.mainImage ? urlFor(post.mainImage).url() : "/fallback.jpg"})`,
            }}
          ></div>
        )}

        <div className="blogBody">
          {/* Podcast Audio Player */}
          {post.podcastUrl && (
            <div className="bg-gray-100 p-6 rounded-lg mb-10">
              <p className="font-bold mb-2">🎧 Listen to the Podcast</p>
              <audio controls src={post.podcastUrl} className="w-full" />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} />
          </div>
        </div>
      </div>
    </article>
  );
}
