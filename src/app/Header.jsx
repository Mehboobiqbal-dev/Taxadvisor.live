import { useState, useEffect } from "react";
import Link from "next/link";
import ChatComponent from "./components/ChatComponent"; // Ensure correct import
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Close menu when clicking a link
  useEffect(() => {
    if (menuOpen) {
      const closeMenu = () => setMenuOpen(false);
      window.addEventListener("click", closeMenu);
      return () => window.removeEventListener("click", closeMenu);
    }
  }, [menuOpen]);

  return (
    <header className="header">
      <nav className="header-nav" role="navigation" aria-label="Main Navigation">
        {/* Logo */}
        <h1 className="header-logo">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Tax Advisor
          </Link>
        </h1>

        {/* Menu Toggle Button */}
        <button
          className="menu-icon"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={(e) => {
            e.stopPropagation(); // Prevent immediate closing
            setMenuOpen(!menuOpen);
          }}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul id="main-menu" className={`header-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link href="/tax-calculator">
              Tax Calculator
            </Link>
          </li>
          <li>
            <Link href="/newslist">  {/* ✅ Fixed the path */}
              News
            </Link>
          </li>
          
          <li>
            <button className="chat-toggle-btn" onClick={() => setShowChat(!showChat)}>
              {showChat ? "Close TaxGPT" : "Open TaxGPT"}
            </button>
          </li>
        </ul>
      </nav>

      {/* ChatComponent */}
      {showChat && <ChatComponent />}
    </header>
  );
};

export default Header;
