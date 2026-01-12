"use client";
import Link from "next/link";

import { color, motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import * as Icon from "lucide-react";
import { urlFor } from "@/lib/sanity";
import BlogCard from "./BlogCard";

const Blog = ({ posts }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section className=" " ref={ref}>
      <div className="container">
        {/* <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        ></motion.h2> */}

        <div className="SideHeader">
          <h3 className=" "> Latest Legal Insights & Updates </h3>
        </div>

        <div className="sectionHeader">
          <div className="sectionHeaderRight">
            <h2 className="mainHeader">Blog</h2>
            <h3 className=" ">Stay Informed. Stay Ahead.</h3>
          </div>

          <div className="sectionHeaderleft">
            <p>
              Stay informed with the latest legal updates, insights, and expert
              article to guide you through your legal journey.
            </p>
          </div>
        </div>

        <div className="blog-container">
          {posts.map((post) => {
            // 1. Resolve the slug safely (handles string or object)
            const postSlug =
              typeof post.slug === "string" ? post.slug : post.slug?.current;

            const safeKey = postSlug || post._id || index;

            return (
              <BlogCard
                key={safeKey}
                post={{
                  ...post,
                  slug: postSlug, // Ensure BlogCard receives the string version
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
