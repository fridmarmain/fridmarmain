"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to get current URL
import "../styles/sidebar.css";

const PracticeSidebar = ({ practices }) => {
  const pathname = usePathname();

  return (
    <aside className="practice-sidebar">
      <h3 className="sidebar-title">Our Expertise</h3>
      <nav className="sidebar-nav">
        {practices.map((item) => {
          const href = `/practice/${item.slug}`;
          // Check if current URL matches the link's destination
          const isActive = pathname === href;

          return (
            <Link
              key={item.slug}
              href={href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              {item.name}
              {isActive && <span className="active-dot" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default PracticeSidebar;
