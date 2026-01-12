"use client";

import "../styles/navbar.css";
import * as Icon from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// import * as navigation from "next/navigation";
import Link from "next/link";

const NavbarClient = ({ categories, practices }) => {
  //   const pathname = navigation.usePathname();
  const pathname = usePathname();
  const isNotHome = pathname !== "/" || "/about";

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
          <Link href="/about">About</Link>
          <div className="dropdown">
            <Link href="/practice-areas">Practice Areas</Link>
            <div className="dropdown-content">
              {practices &&
                practices.map((practice, index) => (
                  <Link
                    key={practice.slug || index}
                    href={`/practice/${practice.slug}`}
                  >
                    {practice.title}
                  </Link>
                ))}
            </div>
          </div>
          <div className="dropdown">
            <Link href="/resources">Resources</Link>
            <div className="dropdown-content">
              {/* This now works because categories is a prop! */}
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
          <Link href="/contact">Contact</Link>
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
