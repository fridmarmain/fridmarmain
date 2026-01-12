import { getPracticeArea, urlFor, getMainPractices } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import * as Icon from "lucide-react";
import PracticeSidebar from "@/components/PracticeSidebar";
import "../../../styles/practiceArea.css"; // Ensure you create this file

export default async function PracticeAreaPage({ params }) {
  const { slug } = await params;
  const [data, allPractices] = await Promise.all([
    getPracticeArea(slug),
    getMainPractices(),
  ]);

  const sidebarLinks = allPractices.map((p) => ({
    name: p.title,
    slug: p.slug,
  }));

  if (!data) return <div className="error-state">Practice Area Not Found</div>;

  return (
    <main className="practice-area-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        {data.mainImage && (
          <img
            src={urlFor(data.mainImage).url()}
            className="hero-bg-image"
            alt={data.title}
          />
        )}
        <div className="hero-content">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          {/* <button className="btn-primary">
            Book a Consultation <Icon.Calendar size={20} />
          </button> */}
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
              <PracticeSidebar practices={sidebarLinks} />

              {/* REVIEWS */}
              <div className="reviews-card">
                <h3>Client Testimonials</h3>
                {data.reviews?.map((rev, i) => (
                  <div key={i} className="testimonial">
                    <p className="quote">"{rev.content}"</p>
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
