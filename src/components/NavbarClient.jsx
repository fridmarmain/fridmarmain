"use client";

import "../styles/navbar.css";
import * as Icon from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavbarClient = ({ categories, practices }) => {
  const pathname = usePathname();
  const isNotHome = !(
    ["/", "/about", "/resources", "/services"].includes(pathname) ||
    pathname.startsWith("/practice")
  );

  const [scrolled, setScrolled] = useState(false);
  const [atTop50, setAtTop50] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const difference = currentScroll - lastScroll;

      if (difference > 50) {
        setScrolled(true);
        setLastScroll(currentScroll);
      }

      if (difference < -50) {
        setScrolled(false);
        setLastScroll(currentScroll);
      }

      setAtTop50(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : "shown"} ${atTop50 ? "past-50" : ""} ${isNotHome ? "internal-page" : "home-page"}`}
    >
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-icon"></span>
        </Link>
        <div className="navbar-links">
          {/* 1. Map through the top-level Umbrella categories first */}
          {practices &&
            practices.map((umbrella) => (
              <div key={umbrella.slug} className="nav-item-wrapper dropdown">
                <Link href={`/practice/${umbrella.slug}`} className="nav-link">
                  {umbrella.title}
                </Link>

                {/* 2. Mega Menu Content for each Umbrella */}

                {umbrella.categories.length > 0 && (
                  <div className="mega-menu-content">
                    <div className="  container megaContInner">
                      {umbrella.categories?.map((cat) => (
                        <div key={cat.slug} className="megaEachCont">
                          <Link
                            href={`/practice/${umbrella.slug}/${cat.slug}`}
                            className=" "
                          >
                            <h4 className=" ">{cat.title}</h4>
                          </Link>
                          <div className=" ">
                            {cat.services?.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/practice/${umbrella.slug}/${cat.slug}/${service.slug}`}
                                className="sub-link"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

          <div className="dropdown">
            <Link href="/resources">Resources</Link>
            <div className="dropdown-content">
              {categories &&
                categories.map((cat, index) => (
                  <Link
                    key={cat.slug || cat.title || index}
                    href={`/resources/category/${cat.slug || "uncategorized"}`}
                  >
                    {cat.title}
                  </Link>
                ))}
            </div>
          </div>
          <Link href="/reviews">Reviews</Link>
        </div>

        <div className="flexCont">
          <button className="navbar-cta">
            <div> Book a call</div>
            <div className="iconBall">
              <Icon.ArrowUpRight />
            </div>
          </button>
          <div className="hamBurger">
            <div className="ham1 ham"></div>
            <div className="ham1 ham"></div>
            <div className="ham1 ham"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;
