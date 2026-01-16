"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PracticeSidebar({ tree }) {
  const pathname = usePathname();

  return (
    <div className="practice-sidebar">
      <h3 className="sidebar-header">Explore Services</h3>
      <div className="sidebar-nav-tree">
        {tree.map((umbrella) => (
          <div key={umbrella.slug} className="sidebar-group">
            {/* Level 1: Umbrella */}
            <Link
              href={`/practice/${umbrella.slug}`}
              className={`sidebar-link level-1 ${pathname.includes(umbrella.slug) ? "active" : ""}`}
            >
              {umbrella.title}
            </Link>

            {/* Level 2: Categories (Only show if umbrella is part of current path) */}
            {pathname.includes(umbrella.slug) && (
              <div className="sidebar-sub-levels">
                {umbrella.categories?.map((cat) => (
                  <div key={cat.slug}>
                    <Link
                      href={`/practice/${umbrella.slug}/${cat.slug}`}
                      className={`sidebar-link level-2 ${pathname.includes(cat.slug) ? "active" : ""}`}
                    >
                      {cat.title}
                    </Link>

                    {/* Level 3: Services */}
                    {pathname.includes(cat.slug) && (
                      <div className="sidebar-deep-levels">
                        {cat.services?.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/practice/${umbrella.slug}/${cat.slug}/${service.slug}`}
                            className={`sidebar-link level-3 ${pathname.includes(service.slug) ? "active" : ""}`}
                          >
                            • {service.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
