import { getSinglePost, getRelatedPosts, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import * as Icon from "lucide-react";
import BlogCard from "@/components/BlogCard";
import "../../../styles/postpage.css";
import VideoPlayer from "@/components/VideoPlayer";

// ── Table Block Renderer ──
function TableBlock({ value }) {
  if (!value?.rows?.length) return null;
  return (
    <div className="table-wrapper">
      <table className="portable-table">
        <tbody>
          {value.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.cells?.map((cell, cellIndex) =>
                rowIndex === 0 ? (
                  <th key={cellIndex}>{cell}</th>
                ) : (
                  <td key={cellIndex}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Portable Text Components ──
const portableTextComponents = {
  types: {
    tableBlock: ({ value }) => <TableBlock value={value} />,
    image: ({ value }) => (
      <img
        src={urlFor(value).url()}
        alt={value.alt || ""}
        className="portable-image"
      />
    ),
  },
  block: {
    normal: ({ children }) => <p className="pt-paragraph">{children}</p>,
    h1: ({ children }) => <h1 className="pt-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="pt-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="pt-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="pt-h4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="pt-blockquote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="pt-ul">{children}</ul>,
    number: ({ children }) => <ol className="pt-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pt-li">{children}</li>,
    number: ({ children }) => <li className="pt-li">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="pt-strong">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="pt-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return <div className="status-message pt-40">Post Not Found</div>;

  const relatedPosts = await getRelatedPosts(post.format, slug);
  const bgImage = post.mainImage ? urlFor(post.mainImage).url() : "";

  return (
    <article className="post-page">
      {/* HERO SECTION */}
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

      {/* CONTENT CONTAINER */}
      <div className="content-container">
        <div className="layout-grid">
          <main className="main-content">
            {/* Media Player Section */}
            {(post.videoUrl || post.podcastUrl) && (
              <div className="media-container mb-12">
                {post.format === "video" && post.videoUrl && (
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
                      src={
                        post.podcastUrl.replace(
                          "rss.com/podcasts/",
                          "player.rss.com/",
                        ) + "?theme=light"
                      }
                      title="Podcast Player"
                      width="100%"
                      height="202px"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      scrolling="no"
                    ></iframe>
                  </div>
                )}
              </div>
            )}

            <div className="rich-text-content">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
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
        </div>
      </div>
    </article>
  );
}
