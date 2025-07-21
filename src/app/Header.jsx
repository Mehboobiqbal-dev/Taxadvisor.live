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
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target.getAttribute('aria-label') !== 'Toggle Navigation Menu'
      ) {
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
    <header className="header sticky top-0 w-full z-50 shadow-custom">
      <div className="container flex items-center justify-between py-2">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Tax Advisor Home" onClick={() => setMenuOpen(false)}>
            <img
              src="https://i.ibb.co/vxKbKLHT/photo.jpg"
              alt="Tax Advisor Logo"
              className="h-12 w-12 rounded-full border-2 border-accent shadow"
              loading="lazy"
            />
          </Link>
          <span className="text-2xl font-bold tracking-tight text-white hidden md:inline">TaxAdvisor</span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/home" className="hover:text-accent transition-colors font-medium">Home</Link>
          <Link href="/tax-calculator" className="hover:text-accent transition-colors font-medium">Tax Calculator</Link>
          <Link href="/SmartTaxBot" className="hover:text-accent transition-colors font-medium">SmartTaxBot</Link>
          <Link href="/newslist" className="hover:text-accent transition-colors font-medium">News</Link>
          <Link href="/blog" className="hover:text-accent transition-colors font-medium">Blog</Link>
        </nav>
        {/* User Button and Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <UserButton />
          <button
            className="text-3xl text-white md:hidden ml-2"
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
      </div>
      {/* Mobile Nav */}
      <nav
        ref={menuRef}
        id="main-menu"
        className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-gradient-to-br from-[#141e30] to-[#243b55] text-white transition-all duration-400`}
      >
        <ul className="flex flex-col items-center gap-2 py-4">
          <li><Link href="/home" onClick={() => setMenuOpen(false)} className="hover:text-accent text-lg py-2">Home</Link></li>
          <li><Link href="/tax-calculator" onClick={() => setMenuOpen(false)} className="hover:text-accent text-lg py-2">Tax Calculator</Link></li>
          <li><Link href="/SmartTaxBot" onClick={() => setMenuOpen(false)} className="hover:text-accent text-lg py-2">SmartTaxBot</Link></li>
          <li><Link href="/newslist" onClick={() => setMenuOpen(false)} className="hover:text-accent text-lg py-2">News</Link></li>
          <li><Link href="/blog" onClick={() => setMenuOpen(false)} className="hover:text-accent text-lg py-2">Blog</Link></li>
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
