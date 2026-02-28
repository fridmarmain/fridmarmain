"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function PracticeSidebar({ tree }) {
  const pathname = usePathname();

  // 1. Initialize state.
  // We can set the first umbrella to 'true' by default if you want it open on load.
  const [expanded, setExpanded] = useState({});

  // 2. Sync URL with state ONLY on first load
  // This opens the folder you are currently in, but lets you close it later.
  const defaultExpanded = useMemo(() => {
    const initial = {};
    tree.forEach((umbrella) => {
      if (pathname.includes(umbrella.slug)) {
        initial[umbrella.slug] = true;
      }
      umbrella.categories?.forEach((cat) => {
        if (pathname.includes(cat.slug)) {
          initial[cat.slug] = true;
        }
      });
    });
    return initial;
  }, [tree, pathname]);

  const toggle = (slug) => {
    setExpanded((prev) => ({
      ...prev,
      [slug]: !prev[slug], // This flips the state (Close if Open, Open if Closed)
    }));
  };

  return (
    <div className="practice-sidebar">
      <h3 className="sidebar-header">Explore Practice Areas</h3>
      <div className="sidebar-nav-tree">
        {tree.map((umbrella) => {
          // Use the state 'expanded' to determine if it's shown
          const isOpen = expanded[umbrella.slug];

          return (
            <div key={umbrella.slug} className="sidebar-group">
              <div className={`sidebar-item-row ${isOpen ? "is-open" : ""}`}>
                <Link
                  href={`/practice/${umbrella.slug}`}
                  className={`sidebar-link level-1 ${pathname === `/practice/${umbrella.slug}` ? "active" : ""}`}
                >
                  {umbrella.title}
                </Link>
                {/* Click the button to toggle without navigating */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggle(umbrella.slug);
                  }}
                  className="toggle-btn"
                >
                  {isOpen ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>

              {isOpen && (
                <div className="sidebar-sub-levels">
                  {umbrella.categories?.map((cat) => {
                    const isCatOpen = expanded[cat.slug];
                    return (
                      <div key={cat.slug} className="sidebar-cat-group">
                        <div className="sidebar-item-row">
                          <Link
                            href={`/practice/${umbrella.slug}/${cat.slug}`}
                            className={`sidebar-link level-2 ${pathname.includes(cat.slug) ? "active" : ""}`}
                          >
                            {cat.title}
                          </Link>
                          <button
                            onClick={() => toggle(cat.slug)}
                            className="toggle-btn"
                          >
                            {isCatOpen ? (
                              <ChevronRight size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                          </button>
                        </div>

                        {isCatOpen && (
                          <div className="sidebar-deep-levels">
                            {cat.services?.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/practice/${umbrella.slug}/${cat.slug}/${service.slug}`}
                                className={`sidebar-link level-3 ${pathname === `/practice/${umbrella.slug}/${cat.slug}/${service.slug}` ? "active" : ""}`}
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
