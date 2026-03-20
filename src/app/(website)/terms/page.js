import { getTermsOfUse } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import * as Icon from "lucide-react";
import "../styles/terms.css";
import { generateSEO } from "@/lib/seo";

// ─── Portable Text Components ─────────────────────────────────────────────────
const portableTextComponents = {
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target={value.blank ? "_blank" : "_self"}
        rel={value.blank ? "noopener noreferrer" : undefined}
        className="terms-link"
      >
        {children}
      </a>
    ),
    underline: ({ children }) => <u>{children}</u>,
  },
  list: {
    bullet: ({ children }) => <ul className="terms-list bullet">{children}</ul>,
    number: ({ children }) => <ol className="terms-list number">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

// ─── Metadata for SEO ───────────────────────────────────────────────────────
export async function generateMetadata() {
  const data = await getTermsOfUse();

  return generateSEO({
    title: data?.title || "Terms of Use",
    description:
      "Read the Terms of Use for Fridmar Professional Corporation, detailing user responsibilities and legal policies for accessing our site and services.",
    path: "/terms-of-use",
    image: "/og-image.png",
    type: "website",
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function TermsPage() {
  const data = await getTermsOfUse();

  if (!data) return <div className="error-state">Terms of Use not found.</div>;

  const formattedDate = data.lastUpdated
    ? new Date(data.lastUpdated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="terms-page">
      {/* HERO — matches practiceArea pattern */}
      <section className="hero-section terms-hero">
        <div className="hero-overlay" />
        <div className="hero-container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span>
              <Icon.ChevronRight size={14} className="mx-2 opacity-50" />
              <span className="active-breadcrumb">Terms of Use</span>
            </span>
          </nav>

          <div className="hero-content">
            <h1>{data.title || "Terms of Use"}</h1>
            {formattedDate && (
              <p className="terms-last-updated">
                Last Updated: {formattedDate}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="content-container">
        <div className="terms-layout">
          {/* TABLE OF CONTENTS */}
          {data.sections?.length > 0 && (
            <aside className="terms-toc">
              <div className="sticky-sidebar">
                <h3 className="toc-heading">Contents</h3>
                <ul className="toc-list">
                  {data.sections.map((section, i) => (
                    <li key={i}>
                      <a href={`#section-${i}`} className="toc-link">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* MAIN CONTENT */}
          <article className="terms-content">
            {data.sections?.map((section, i) => (
              <div key={i} id={`section-${i}`} className="terms-section">
                <h3 className="terms-section-heading">{section.heading}</h3>
                {section.body && (
                  <div className="terms-rich-text">
                    <PortableText
                      value={section.body}
                      components={portableTextComponents}
                    />
                  </div>
                )}
              </div>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
