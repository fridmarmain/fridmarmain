"use client";
import Link from "next/link";

import { color, motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import * as Icon from "lucide-react";
import { urlFor } from "@/lib/sanity";

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
          <motion.div
            className="blogCont"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            {posts?.map((post) => (
              <div key={post.slug.current} className="eachBlog ">
                <div
                  className="eachBlog "
                  style={{
                    // 2. Use urlFor for Sanity images
                    backgroundImage: `url(${post.mainImage ? urlFor(post.mainImage).url() : "/fallback.jpg"})`,
                  }}
                >
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="iconItem"
                    style={{ color: "black" }}
                  >
                    <Icon.ArrowUpRight />
                  </Link>
                </div>

                <h3 className="titleCont">{post.title}</h3>
                {/* 3. Using description from Sanity */}
                <p>{post.description || "Read our latest legal update..."}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
