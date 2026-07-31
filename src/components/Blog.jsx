"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";
import BlogCard from "./BlogCard";

const Blog = ({ sectionData, posts }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  if (!posts || posts.length === 0) return null;

  // Resolve headers dynamically with perfect look-ahead historic defaults
  const sideHeader =
    sectionData?.header?.sideHeader || "Latest Legal Insights & Updates";
  const mainHeader = sectionData?.header?.mainHeader || "Resources";
  const subHeader =
    sectionData?.header?.subHeader || "Stay Informed. Stay Ahead.";
  const description =
    sectionData?.header?.description ||
    "Stay informed with the latest legal updates, insights, and expert articles to guide you through your legal journey.";

  return (
    <section ref={ref}>
      <div className="container">
        <div className="SideHeader">
          <h3>{sideHeader}</h3>
        </div>

        <div className="sectionHeader">
          <div className="sectionHeaderRight">
            <h2 className="mainHeader">{mainHeader}</h2>
            <h3>{subHeader}</h3>
          </div>

          <div className="sectionHeaderleft">
            <p>{description}</p>
          </div>
        </div>

        <div className="blog-container">
          {posts.map((post) => {
            const postSlug =
              typeof post.slug === "string" ? post.slug : post.slug?.current;
            const safeKey = postSlug || post._id;

            return (
              <BlogCard
                key={safeKey}
                post={{
                  ...post,
                  slug: postSlug,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
