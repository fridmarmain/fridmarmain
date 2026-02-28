"use client";

import "../styles/navbar.css";
import * as Icon from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * 1. NAV LINKS COMPONENT
 * Handles recursive dropdowns for "Children of Children"
 */
const NavLinks = ({ isMobile = false, practices, categories, closeMenu }) => {
  // Track open states for multiple levels
  const [openSubMenu, setOpenSubMenu] = useState(null); // Level 1 (Umbrellas)
  const [openInnerMenu, setOpenInnerMenu] = useState(null); // Level 2 (Categories)

  const toggleLevel1 = (slug) =>
    setOpenSubMenu(openSubMenu === slug ? null : slug);
  const toggleLevel2 = (slug) =>
    setOpenInnerMenu(openInnerMenu === slug ? null : slug);

  const handleLinkClick = () => {
    if (isMobile) closeMenu();
  };

  return (
    <>
      {practices?.map((umbrella) => {
        const hasCategories = umbrella.categories?.length > 0;
        const isL1Open = openSubMenu === umbrella.slug;
        const hasContent = umbrella.categories?.length > 0;

        return (
          <div
            key={umbrella.slug}
            className={`nav-item-wrapper ${isMobile ? "mobile-item-container" : "dropdown"}`}
          >
            <div className="nav-link-flex">
              <Link
                href={`/practice/${umbrella.slug}`}
                className="nav-link"
                onClick={handleLinkClick}
              >
                {umbrella.title}
              </Link>
              {hasCategories && (
                <Icon.ChevronDown
                  size={18}
                  className={`drop-icon ${isL1Open ? "rotated" : ""}`}
                  onClick={() => isMobile && toggleLevel1(umbrella.slug)}
                />
              )}
            </div>

            {/* --- LEVEL 2 (Categories) --- */}

            {hasContent && (
              <div
                className={`${isMobile ? "mobile-accordion" : "mega-menu-content"} ${isL1Open ? "open" : ""}`}
              >
                <div
                  className={
                    isMobile ? "mobile-inner-list" : "container megaContInner"
                  }
                >
                  {umbrella.categories.map((cat) => {
                    const hasServices = cat.services?.length > 0;
                    const isL2Open = openInnerMenu === cat.slug;

                    return (
                      <div
                        key={cat.slug}
                        className={
                          isMobile ? "mobile-nested-wrapper" : "megaEachCont"
                        }
                      >
                        <div className="nav-link-flex">
                          <Link
                            href={`/practice/${umbrella.slug}/${cat.slug}`}
                            className={isMobile ? "mobile-sub-link" : ""}
                            onClick={handleLinkClick}
                          >
                            <h4 style={{ margin: 0 }}>{cat.title}</h4>
                          </Link>
                          {isMobile && hasServices && (
                            <Icon.ChevronDown
                              size={16}
                              className={`drop-icon ${isL2Open ? "rotated" : ""}`}
                              onClick={() => toggleLevel2(cat.slug)}
                            />
                          )}
                        </div>

                        {/* --- LEVEL 3 (Services) --- */}
                        <div
                          className={`${isMobile ? "mobile-accordion nested" : "services-list"} ${isL2Open || !isMobile ? "open" : ""}`}
                        >
                          {cat.services?.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/practice/${umbrella.slug}/${cat.slug}/${service.slug}`}
                              className="sub-link"
                              onClick={handleLinkClick}
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* RESOURCES SECTION */}
      <div
        className={`nav-item-wrapper ${isMobile ? "mobile-item-container" : "dropdown"}`}
      >
        <div className="nav-link-flex">
          <Link
            href="/resources"
            className="nav-link"
            onClick={handleLinkClick}
          >
            Resources
          </Link>
          <Icon.ChevronDown
            size={18}
            className={`drop-icon ${openSubMenu === "resources" ? "rotated" : ""}`}
            onClick={() => isMobile && toggleLevel1("resources")}
          />
        </div>
        <div
          className={`${isMobile ? "mobile-accordion" : "dropdown-content"} ${openSubMenu === "resources" ? "open" : ""}`}
        >
          {categories?.map((cat, index) => (
            <Link
              key={cat.slug || index}
              href={`/resources/category/${cat.slug}`}
              className="sub-link"
              onClick={handleLinkClick}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/reviews"
        className={isMobile ? "mobile-item-link" : "nav-link"}
        onClick={handleLinkClick}
      >
        Reviews
      </Link>
    </>
  );
};

/**
 * 2. MAIN NAVBAR CLIENT
 */
const NavbarClient = ({ categories, practices }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [atTop50, setAtTop50] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const isNotHome = !(
    ["/", "/about", "/resources", "/services"].includes(pathname) ||
    pathname.startsWith("/practice")
  );

  // Close menu on route change (Backup for internal navigation)
  if (pathname !== prevPathname) {
    setIsOpen(false);
    setPrevPathname(pathname);
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        setScrolled(false);
        setAtTop50(false);
        return;
      }
      const difference = currentScroll - lastScroll;
      if (difference > 50) setScrolled(true);
      else if (difference < -50) setScrolled(false);
      setAtTop50(currentScroll > 50);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : "shown"} ${atTop50 ? "past-50" : ""} ${isNotHome ? "internal-page" : ""}`}
      >
        <div className="navbar-container">
          <Link href="/" className="navbar-logo">
            <span className="logo-icon"></span>
          </Link>

          <div className="navbar-links desktop-only">
            <NavLinks
              practices={practices}
              categories={categories}
              isMobile={false}
            />
          </div>

          <div className="flexCont">
            <Link
              href="https://calendly.com/fridmar/meet-with-mey"
              className="navbar-cta desktop-only"
            >
              Book a call
            </Link>
            <div
              className={`hamBurger ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="ham"></div>
              <div className="ham"></div>
              <div className="ham"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div className={`mobile-menu-overlay ${isOpen ? "mobile-active" : ""}`}>
        <div className="mobile-links-wrapper">
          <NavLinks
            isMobile={true}
            practices={practices}
            categories={categories}
            closeMenu={() => setIsOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default NavbarClient;
