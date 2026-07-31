import React from "react";
import * as Icon from "lucide-react";
import Link from "next/link";

function InfoBox({ links }) {
  // 1. Setup your historical initial values as fallbacks so nothing looks empty or broken
  const defaultLinks = [
    {
      title: "Construction Law Services",
      url: "/practice/construction-law",
      icon: { name: "File" },
      isActive: false,
    },
    {
      title: "Access a lawyer",
      url: "https://calendly.com/fridmar/meet-with-mey",
      icon: { name: "UserPlus" },
      isActive: true,
    },
    {
      title: "Legal Resources & Insights",
      url: "/resources",
      icon: { name: "Book" },
      isActive: false,
    },
  ];

  // Use Sanity links array if filled, otherwise use our initial data structure
  const visibleLinks = links && links.length > 0 ? links : defaultLinks;

  return (
    <div className="info-box">
      {visibleLinks.map((link, index) => {
        // Resolve Lucide component string safely or fall back to standard HelpCircle
        const IconComponent = Icon[link.icon?.name] || Icon.HelpCircle;
        const className = link.isActive ? "infoInnerMidActive" : "infoInnerMid";
        const isExternal = link.url?.startsWith("http");

        const linkContent = (
          <>
            <div className="innerContLeft">
              <div className="innerPic">
                <IconComponent size={18} />
              </div>
              <div className="innerTextCont">{link.title}</div>
            </div>
            <Icon.ArrowUpRight className="midIcon" />
          </>
        );

        return isExternal ? (
          <a
            key={index}
            href={link.url}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkContent}
          </a>
        ) : (
          <Link key={index} href={link.url || "#"} className={className}>
            {linkContent}
          </Link>
        );
      })}
    </div>
  );
}

export default InfoBox;
