import { getPracticeArea, urlFor, getMainPractices } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import * as Icon from "lucide-react";
import PracticeSidebar from "@/components/PracticeSidebar";

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
  if (!data) return <div>Practice Area Not Found</div>;

  return (
    <main className="practice-area-page">
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-900 text-white">
        {data.mainImage && (
          <img
            src={urlFor(data.mainImage).url()}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            alt={data.title}
          />
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-4">{data.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{data.description}</p>
          <button className="mt-8 bg-gold text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto">
            Book a Consultation <Icon.Calendar size={20} />
          </button>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* 2. MAIN CONTENT (Left) */}
          <div className="lg:w-2/3">
            <div className="prose prose-xl mb-16">
              <PortableText value={data.body} />
            </div>

            {/* SUB-PAGES GRID (Interactive Exploration) */}
            <h2 className="text-3xl font-serif mb-8 border-b pb-4">
              Specialized Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-20">
              {data.subAreas?.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/practice/${slug}/${sub.slug}`}
                  className="p-6 border hover:border-gold transition-all group rounded-lg"
                >
                  <h3 className="text-xl font-bold group-hover:text-gold">
                    {sub.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {sub.description}
                  </p>
                  <span className="inline-block mt-4 text-xs font-bold tracking-widest uppercase">
                    Learn More →
                  </span>
                </Link>
              ))}
            </div>

            {/* FAQ SECTION */}
            {data.faqs && (
              <section className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-3xl font-serif mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {data.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group bg-white p-6 rounded-lg shadow-sm cursor-pointer"
                    >
                      <summary className="font-bold text-lg flex justify-between items-center list-none">
                        {faq.question}
                        <Icon.ChevronDown className="group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="mt-4 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="sidebar-container">
            <PracticeSidebar practices={sidebarLinks} />
          </div>

          {/* 3. SIDEBAR (Right) - Trust & Connectivity */}
          <aside className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              {/* REVIEWS BUCKET */}
              <div className="bg-slate-900 text-white p-8 rounded-2xl">
                <h3 className="text-xl font-serif mb-6">Client Testimonials</h3>
                {data.reviews?.map((rev, i) => (
                  <div
                    key={i}
                    className="mb-6 border-b border-gray-700 pb-6 last:border-0"
                  >
                    <p className="italic text-gray-300">"{rev.content}"</p>
                    <p className="mt-4 font-bold text-gold">
                      - {rev.clientName}
                    </p>
                  </div>
                ))}
                <Link href="/reviews" className="text-sm underline">
                  View all reviews
                </Link>
              </div>

              {/* QUICK CONTACT CTA */}
              <div className="border-2 border-gold p-8 rounded-2xl text-center">
                <Icon.PhoneCall className="mx-auto mb-4 text-gold" size={40} />
                <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Our experts are ready to assist with your case.
                </p>
                <Link
                  href="/contact"
                  className="block w-full bg-black text-white py-4 rounded-lg font-bold"
                >
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
