"use client";

import "../styles/navbar.css";
import * as Icon from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * 1. NAV LINKS COMPONENT
 * Handles multi-level dropdown menus exactly as designed, using Sanity settings text/links with fallback options.
 */
const NavLinks = ({
  isMobile = false,
  practices,
  categories,
  settings,
  closeMenu,
}) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openInnerMenu, setOpenInnerMenu] = useState(null);

  const toggleLevel1 = (slug) =>
    setOpenSubMenu(openSubMenu === slug ? null : slug);
  const toggleLevel2 = (slug) =>
    setOpenInnerMenu(openInnerMenu === slug ? null : slug);

  const handleLinkClick = () => {
    if (isMobile) closeMenu();
  };

  // Editable settings targets with your exact original defaults
  const resourcesLabel = settings?.resourcesLabel || "Resources";
  const resourcesPath = settings?.resourcesPath || "/resources";
  const reviewsLabel = settings?.reviewsLabel || "Reviews";
  const reviewsPath = settings?.reviewsPath || "/reviews";

  return (
    <>
      {/* PRACTICE AREAS RENDER MATRIX */}
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

            {/* LEVEL 2 (Categories) */}
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

                        {/* LEVEL 3 (Services) */}
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

      {/* RESOURCES MENU DROPDOWN SECTION */}
      <div
        className={`nav-item-wrapper ${isMobile ? "mobile-item-container" : "dropdown"}`}
      >
        <div className="nav-link-flex">
          <Link
            href={resourcesPath}
            className="nav-link"
            onClick={handleLinkClick}
          >
            {resourcesLabel}
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
          {settings?.customResourcesLinks?.length > 0
            ? settings.customResourcesLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.path}
                  className="sub-link"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))
            : categories?.map((cat, index) => (
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

      {/* REVIEWS BASE SECTION */}
      <Link
        href={reviewsPath}
        className={isMobile ? "mobile-item-link" : "nav-link"}
        onClick={handleLinkClick}
      >
        {reviewsLabel}
      </Link>

      {/* EXTRA SANITY LINKS INTERFACE */}
      {settings?.extraLinks?.map((link, idx) => (
        <Link
          key={idx}
          href={link.path}
          className={isMobile ? "mobile-item-link" : "nav-link"}
          onClick={handleLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

/**
 * 2. MAIN NAVBAR CLIENT
 */
const NavbarClient = ({ categories, practices, settings }) => {
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

  const bookingUrl =
    settings?.bookingUrl || "https://calendly.com/fridmar/meet-with-mey";
  const bookingLabel = settings?.bookingLabel || "Book a call";

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
              settings={settings}
              isMobile={false}
            />
          </div>

          <div className="flexCont">
            <Link
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex" }}
              className="secondaryBtn"
            >
              <div>{bookingLabel}</div>
              <div className="iconBall">
                <Icon.ArrowUpRight />
              </div>
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
            settings={settings}
            closeMenu={() => setIsOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default NavbarClient;
