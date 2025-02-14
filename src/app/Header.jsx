"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    if (menuOpen) {
      const closeMenu = () => setMenuOpen(false);
      window.addEventListener("click", closeMenu);
      return () => window.removeEventListener("click", closeMenu);
    }
  }, [menuOpen]);

  return (
    <header className="header" role="banner">
      <nav className="header-nav" role="navigation" aria-label="Main Navigation">
        {/* Logo */}
        <h1 className="header-logo">
          <Link href="/" legacyBehavior>
            <a onClick={() => setMenuOpen(false)} aria-label="Tax Advisor Home">
              <img
                src="https://i.postimg.cc/xT3d2TBK/photo-removebg-preview-1.png"
                alt="Tax Advisor Logo"
                className="logo"
                loading="lazy"
              />
            </a>
          </Link>
        </h1>

        {/* Menu Toggle Button */}
        <button
          className="menu-icon"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul
          id="main-menu"
          className={`header-links ${menuOpen ? "show" : ""}`}
          aria-label="Main Menu"
        >
          <li>
            <Link href="/home" legacyBehavior>
              <a onClick={() => setMenuOpen(false)} aria-label="Go to Home Page">
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/tax-calculator" legacyBehavior>
              <a onClick={() => setMenuOpen(false)} aria-label="Tax Calculator">
                Tax Calculator
              </a>
            </Link>
          </li>
          <li>
            <Link href="/SmartTaxBot" legacyBehavior>
              <a onClick={() => setMenuOpen(false)} aria-label="Go to SmartTaxBot Page">
                SmartTaxBot
              </a>
            </Link>
          </li>
          <li>
            <Link href="/newslist" legacyBehavior>
              <a onClick={() => setMenuOpen(false)} aria-label="Go to News Page">
                News
              </a>
            </Link>
          </li>
          <li>
            <Link href="/blog" legacyBehavior>
              <a onClick={() => setMenuOpen(false)} aria-label="Go to Blog Page">
                Blog
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
