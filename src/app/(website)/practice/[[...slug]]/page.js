import {
  getPracticeArea,
  urlFor,
  getMainPractices,
  getMegaMenuList,
} from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import * as Icon from "lucide-react";
import PracticeSidebar from "@/components/PracticeSidebar";
import "../../../styles/practiceArea.css"; // Ensure you create this file

export default async function PracticeAreaPage({ params }) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    // You can fetch a specific "Main Practice" doc or show all umbrellas
    return <div>Main Practice Landing Page Content</div>;
  }
  const currentSlug = slug[slug.length - 1];

  const [data, fullTree] = await Promise.all([
    getPracticeArea(currentSlug),
    getMegaMenuList(),
  ]);

  if (!data) return <div className="error-state">Practice Area Not Found</div>;

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
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative", // Required for the content to sit on top
        }}
      >
        {/* Optional: Dark overlay to make white text pop */}
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
            <h1>{data.title}</h1>
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
                      href={`/practice/${slug}/${sub.slug}`}
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
            {/* SUB-PAGES GRID */}

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
                <Link href="/contact" className="btn-black">
                  Contact Us Now
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
