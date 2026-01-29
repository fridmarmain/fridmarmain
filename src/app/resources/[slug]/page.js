import { getSinglePost, getRelatedPosts, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import * as Icon from "lucide-react";
import BlogCard from "@/components/BlogCard";
import "../../../styles/postpage.css";
import VideoPlayer from "@/components/VideoPlayer";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return <div className="status-message pt-40">Post Not Found</div>;

  const relatedPosts = await getRelatedPosts(post.format, slug);

  // Prepare the background image URL
  const bgImage = post.mainImage ? urlFor(post.mainImage).url() : "";

  return (
    <article className="post-page">
      {/* HERO SECTION with Inline Background */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url(${bgImage})`,
        }}
      >
        <div className="hero-content">
          <div className="flex-center gap-2 mb-4">
            {post.categories?.map((cat) => (
              <span key={cat.slug} className="badge">
                {cat.title}
              </span>
            ))}
          </div>
          <h1>{post.title}</h1>
          <p className="hero-date">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </p>
        </div>
      </section>

      {/* OVERLAPPING CONTENT CONTAINER */}
      <div className="content-container">
        <div className="layout-grid">
          <main className="main-content">
            {/* Media Player Section */}
            {(post.videoUrl || post.podcastUrl) && (
              <div className="media-container mb-12">
                {post.format === "video" && post.videoUrl && (
                  /* Use our new Client Component here */

                  <VideoPlayer
                    videoUrl={post.videoUrl}
                    coverImage={post.videoCover}
                  />
                )}

                {post.format === "podcast" && post.podcastUrl && (
                  <div className="podcast-box">
                    <h3 className="podcast-label">
                      <Icon.Mic size={18} /> Listen to Episode
                    </h3>
                    <iframe
                      src={post.podcastUrl}
                      title="Podcast Player"
                      width="100%"
                      height="160px"
                      frameBorder="0"
                    ></iframe>
                  </div>
                )}
              </div>
            )}

            <div className="rich-text-content">
              <PortableText value={post.body} />
            </div>

            {/* Related Section */}
            {relatedPosts.length > 0 && (
              <section className="related-section">
                <div className="section-header">
                  <h2 className="section-title">More {post.format}s</h2>
                  <Icon.ArrowRight className="text-gold" />
                </div>
                <div className="related-grid">
                  {relatedPosts.map((related) => (
                    <BlogCard key={related.slug} post={related} />
                  ))}
                </div>
              </section>
            )}
          </main>

          <aside className="sidebar">
            <div className="sticky-sidebar">
              <div className="contact-cta">
                <Icon.Mail className="cta-icon" size={40} />
                <h3>Need Legal Advice?</h3>
                <p>Contact our experts today for a consultation.</p>
                <a href="/contact" className="btn-black">
                  Get in Touch
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
