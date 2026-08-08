export const revalidate = 3600;
export const dynamicParams = true;

import {
  getPracticeArea,
  urlFor,
  getMainPractices,
  getMegaMenuList,
} from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Icon from "lucide-react";
import PracticeSidebar from "@/components/PracticeSidebar";
import "../../../styles/practiceArea.css";

import { generateSEO } from "@/lib/seo";

// Helper function to validate dynamic route slugs against bot traps
function isBotTrap(slug) {
  if (!slug) return false;
  const hasComma = slug.some(
    (segment) => segment.includes(",") || segment.includes("%2C"),
  );
  const isTooDeep = slug.length > 3;
  return hasComma || isTooDeep;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (isBotTrap(slug)) {
    notFound();
  }

  if (!slug || slug.length === 0) {
    return generateSEO({
      title: "Practice Areas",
      description:
        "Explore our main legal practice areas at Fridmar Professional Corporation.",
      path: "/practice",
    });
  }

  const currentSlug = slug[slug.length - 1];
  const data = await getPracticeArea(currentSlug);

  if (!data) {
    return generateSEO({
      title: "Practice Area Not Found",
      description: "The requested practice area could not be found.",
      path: `/practice/${currentSlug}`,
    });
  }

  return generateSEO({
    title: data.title,
    description:
      data.description ||
      `Expert legal services in ${data.title} at Fridmar Professional Corporation.`,
    path: `/practice/${slug.join("/")}`,
    image: data.mainImage ? urlFor(data.mainImage).url() : "/og-image.png",
    type: "website",
  });
}

export default async function PracticeAreaPage({ params }) {
  const { slug } = await params;

  if (isBotTrap(slug)) {
    notFound();
  }

  if (!slug || slug.length === 0) {
    return <div>Main Practice Landing Page Content</div>;
  }

  const currentSlug = slug[slug.length - 1];

  const [data, fullTree] = await Promise.all([
    getPracticeArea(currentSlug),
    getMegaMenuList(),
  ]);

  if (!data) return notFound();

  const breadcrumbItems = slug.map((segment, index) => {
    const path = `/practice/${slug.slice(0, index + 1).join("/")}`;
    return {
      label: segment.replace(/-/g, " "),
      path,
    };
  });

  return (
    <main className="practice-area-page">
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{
          backgroundImage: data.mainImage
            ? `url(${urlFor(data.mainImage).url()})`
            : "url(/about/aboutx.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-container">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            {breadcrumbItems.map((item, i) => (
              <span key={item.path}>
                <Icon.ChevronRight size={14} className="mx-2 opacity-50" />
                <Link
                  href={item.path}
                  className={
                    i === breadcrumbItems.length - 1 ? "active-breadcrumb" : ""
                  }
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="hero-content">
            <h1 style={{ width: "100%" }}>{data.title}</h1>
            <p>{data.description}</p>
          </div>
        </div>
      </section>

      <div className="content-container">
        <div className="layout-grid">
          {/* MAIN CONTENT (Left) */}
          <div className="main-content">
            <div className="rich-text">
              <PortableText value={data.body} />
            </div>
            {data.subAreas && data.subAreas.length > 0 && (
              <>
                <h2 className="section-title">Specialized Services</h2>
                <div className="sub-areas-grid">
                  {data.subAreas?.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/practice/${slug.join("/")}/${sub.slug}`}
                      className="sub-area-card"
                    >
                      <h3>{sub.title}</h3>
                      <p>{sub.description}</p>
                      <span className="learn-more">Learn More →</span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* FAQ SECTION */}
            {data.faqs && data.faqs.length > 0 && (
              <section className="faq-section">
                <h2 className="section-title center">
                  Frequently Asked Questions
                </h2>
                <div className="faq-list">
                  {data.faqs.map((faq, i) => (
                    <details key={i} className="faq-item">
                      <summary>
                        {faq.question}
                        <Icon.ChevronDown className="chevron" size={20} />
                      </summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* SIDEBAR (Right) */}
          <aside className="sidebar">
            <div className="sticky-sidebar">
              <PracticeSidebar tree={fullTree} activeSlug={currentSlug} />

              {/* REVIEWS */}
              <div className="reviews-card">
                <h3>Client Testimonials</h3>
                {data.reviews?.map((rev, i) => (
                  <div key={i} className="testimonial">
                    <p className="quote">{rev.content}</p>
                    <p className="author">- {rev.clientName}</p>
                  </div>
                ))}
                <Link href="/reviews" className="view-all">
                  View all reviews
                </Link>
              </div>

              {/* CONTACT CTA */}
              <div className="contact-cta">
                <Icon.PhoneCall className="cta-icon" size={40} />
                <h3>Need Immediate Help?</h3>
                <p>Our experts are ready to assist with your case.</p>
                <Link
                  href="https://calendly.com/fridmar/meet-with-mey"
                  className="secondaryBtn"
                  style={{ margin: "auto" }}
                >
                  Contact Us Now
                  <div className="iconBall">
                    <Icon.ArrowUpRight />
                  </div>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
