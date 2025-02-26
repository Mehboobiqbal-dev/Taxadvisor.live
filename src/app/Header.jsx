"use client";
import { SessionProvider } from "next-auth/react";
import UserButton from "@/app/components/user-button";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const HeaderContent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="bg-gradient-to-br from-[#141e30] to-[#243b55] text-white py-2 px-8 sticky top-0 w-full z-50 shadow-md">
      <nav className="flex justify-between items-center max-w-[1200px] mx-auto relative w-full">
        {/* Logo on the Left */}
        <div className="flex-shrink-0">
          <h1 className="text-xl font-bold p-1 rounded">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label="Tax Advisor Home"
            >
              <img
                src="https://i.postimg.cc/xT3d2TBK/photo-removebg-preview-1.png"
                alt="Tax Advisor Logo"
                className="w-full max-w-[200px]"
                loading="lazy"
              />
            </Link>
          </h1>
        </div>

        {/* Right Side: User Button & Menu Toggle */}
        <div className="flex items-center gap-4">
          <UserButton />
          <button
            className="text-2xl text-white absolute right-2 top-2"
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
        </div>

        {/* Navigation Menu */}
        <ul
          ref={menuRef}
          id="main-menu"
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-black/95 p-4 text-center rounded-b-lg transition-all duration-400`}
        >
          <li className="py-2">
            <Link
              href="/home"
              onClick={() => setMenuOpen(false)}
              aria-label="Go to Home Page"
            >
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link
              href="/tax-calculator"
              onClick={() => setMenuOpen(false)}
              aria-label="Tax Calculator"
            >
              Tax Calculator
            </Link>
          </li>
          <li className="py-2">
            <Link
              href="/SmartTaxBot"
              onClick={() => setMenuOpen(false)}
              aria-label="SmartTaxBot Page"
            >
              SmartTaxBot
            </Link>
          </li>
          <li className="py-2">
            <Link
              href="/newslist"
              onClick={() => setMenuOpen(false)}
              aria-label="News Page"
            >
              News
            </Link>
          </li>
          <li className="py-2">
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              aria-label="Blog Page"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Header = () => (
  <SessionProvider>
    <HeaderContent />
  </SessionProvider>
);

export default Header;