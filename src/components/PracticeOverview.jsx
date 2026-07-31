"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import "../styles/practice.css";

const PracticeOverview = ({ sectionData, practices }) => {
  // Extract custom text entries or fallback seamlessly to original configurations
  const sideHeader = sectionData?.header?.sideHeader || "Our Services";
  const mainHeader = sectionData?.header?.mainHeader || "Expertise";
  const subHeader = sectionData?.header?.subHeader || "Practice Areas";
  const description =
    sectionData?.header?.description ||
    "Our team of lawyers are dedicated to offering comprehensive legal solutions across multiple practice areas.";

  // Filter out the practices based on user configurations selected inside Sanity
  const filterLevel = sectionData?.displayLevel || "umbrella";
  const filteredPractices =
    practices?.filter((area) => {
      if (filterLevel === "all") return true;
      return area.level === filterLevel;
    }) || [];

  return (
    <section className="container practiceCont">
      <div>
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

        <div className="practiceAreaCont">
          {filteredPractices.map((area, index) => {
            const rawName = area.icon?.name || "";
            const cleanName = rawName.replace(/^Lucide/, "");
            const isCustom = area.iconType === "custom" && area.customSvg;
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

                <div className="InnerPractice">
                  <div>
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
