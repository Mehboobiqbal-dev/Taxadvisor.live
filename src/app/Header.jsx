"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu if a click occurs outside of the menu area.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="header" role="banner">
      <nav className="header-nav" role="navigation" aria-label="Main Navigation">
        {/* Logo */}
        <h1 className="header-logo">
          <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Tax Advisor Home">
            <img
              src="https://i.postimg.cc/xT3d2TBK/photo-removebg-preview-1.png"
              alt="Tax Advisor Logo"
              className="logo"
              loading="lazy"
            />
          </Link>
        </h1>

        {/* Menu Toggle Button */}
        <button
          className="menu-icon"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul
          ref={menuRef}
          id="main-menu"
          className={`header-links ${menuOpen ? "show" : ""}`}
          aria-label="Main Menu"
        >
          <li>
            <Link href="/home" onClick={() => setMenuOpen(false)} aria-label="Go to Home Page">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tax-calculator" onClick={() => setMenuOpen(false)} aria-label="Tax Calculator">
              Tax Calculator
            </Link>
          </li>
          <li>
            <Link href="/SmartTaxBot" onClick={() => setMenuOpen(false)} aria-label="Go to SmartTaxBot Page">
              SmartTaxBot
            </Link>
          </li>
          <li>
            <Link href="/newslist" onClick={() => setMenuOpen(false)} aria-label="Go to News Page">
              News
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={() => setMenuOpen(false)} aria-label="Go to Blog Page">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
