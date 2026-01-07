"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react"; // Import all as LucideIcons
import { urlFor } from "@/lib/sanity";
import "../styles/practice.css";

const PracticeOverview = ({ practices }) => {
  console.log(practices);
  return (
    <section className=" container practiceCont">
      <div className="SideHeader">
        <h3 className=" ">Our Services</h3>
      </div>
      <div className=" ">
        <div className=" ">
          <div>
            <h2 className=" ">Expertise</h2>
            <h3 className=" ">Practice Areas</h3>
          </div>
        </div>

        <div className="practiceAreaCont">
          {practices?.map((area, index) => {
            const rawName = area.icon?.name || "";
            const cleanName = rawName.replace(/^Lucide/, "");

            // 2. Custom SVG check
            const isCustom = area.iconType === "custom" && area.customSvg;

            // 3. Find icon
            const LucideIcon = LucideIcons[cleanName] || LucideIcons.Scale;
            return (
              <motion.div
                key={area.slug?.current || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="eachPractice"
              >
                <Link
                  className="LinkFloat"
                  href={`/practice/${area.slug?.current || area.slug}`}
                />
                {/* Background Image with Overlay */}
                {/* {area.mainImage && (
                  <img
                    src={urlFor(area.mainImage).url()}
                    alt={area.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-20 group-hover:opacity-40"
                  />
                )} */}

                <div className=" InnerPractice">
                  {/* ICON RENDERING */}
                  <div className=" ">
                    {isCustom ? (
                      <div
                        className="svgIcon"
                        dangerouslySetInnerHTML={{ __html: area.customSvg }}
                      />
                    ) : (
                      <LucideIcon size={48} strokeWidth={1.5} />
                    )}
                  </div>

                  <h4 className="practiceHeader">{area.title}</h4>
                  <p className="text-slate-600 mb-6 line-clamp-2">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticeOverview;
