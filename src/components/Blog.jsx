"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import * as Icon from "lucide-react";
import { urlFor } from "@/lib/sanity";
import BlogCard from "./BlogCard";

const Blog = ({ posts }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={ref}>
      <div className="container">
        <div className="SideHeader">
          <h3>Latest Legal Insights & Updates</h3>
        </div>

        <div className="sectionHeader">
          <div className="sectionHeaderRight">
            <h2 className="mainHeader">Resources</h2>
            <h3>Stay Informed. Stay Ahead.</h3>
          </div>

          <div className="sectionHeaderleft">
            <p>
              Stay informed with the latest legal updates, insights, and expert
              articles to guide you through your legal journey.
            </p>
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
