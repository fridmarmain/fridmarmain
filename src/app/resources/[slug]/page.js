import { getSinglePost, getRelatedPosts, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import * as Icon from "lucide-react";
import BlogCard from "@/components/BlogCard"; // Reusing your card component

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return <div className="pt-40 text-center">Post Not Found</div>;

  // Fetch related posts based on the format (video, podcast, or blog)
  const relatedPosts = await getRelatedPosts(post.format, slug);

  return (
    <article className="post-detail pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex gap-2 mb-4">
            {post.categories?.map((cat) => (
              <span key={cat.slug} className="badge">
                {cat.title}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold max-w-4xl">
            {post.title}
          </h1>
        </header>

        {/* Media Player Section */}
        <div className="media-container mb-12">
          {post.format === "video" && post.videoUrl && (
            <div className="aspect-video shadow-2xl overflow-hidden rounded-2xl">
              <iframe
                src={post.videoUrl.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          {post.format === "podcast" && post.podcastUrl && (
            <div className="podcast-embed-container">
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
                  <Icon.Mic size={18} /> Listen to Episode
                </h3>
                <iframe
                  src={post.podcastUrl}
                  title="Podcast Player"
                  width="100%"
                  height="200px"
                  frameBorder="0"
                  scrolling="no"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* Main Body Text */}
        <div className="prose prose-lg lg:prose-xl max-w-none mb-20 border-b border-stone-200 pb-20">
          <PortableText value={post.body} />
        </div>

        {/* RELATED RESOURCES SECTION */}
        {relatedPosts.length > 0 && (
          <section className="related-resources">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">More {post.format}s</h2>
                <p className="text-stone-500">
                  Related insights you might find helpful
                </p>
              </div>
              <Icon.ArrowRight className="text-gold" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
