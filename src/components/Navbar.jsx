"use client"; // <--- ADD THIS LINE HERE
//
import "../styles/navbar.css";
import * as Icon from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname(); // 3. Detect the current URL
  const isNotHome = pathname !== "/"; // 4. Boolean for non-home pages
  const [scrolled, setScrolled] = useState(false);
  const [atTop50, setAtTop50] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const difference = currentScroll - lastScroll;

      // Scrolling down by 50px
      if (difference > 50) {
        setScrolled(true);
        setLastScroll(currentScroll);
      }

      // Scrolling up by 50px
      if (difference < -50) {
        setScrolled(false);
        setLastScroll(currentScroll);
      }

      // More than 50px from the top
      setAtTop50(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <>
      <nav
        className={`navbar 
    ${scrolled ? "scrolled" : "shown"} 
    ${atTop50 ? "past-50" : ""} ${isNotHome ? "internal-page" : "home-page"}`}
      >
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-icon"></span>
          </div>
          <div className="navbar-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/practice-areas">Practice Areas</Link>
            <Link href="/blog">Resources</Link>
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
    </>
  );
};

export default Navbar;
