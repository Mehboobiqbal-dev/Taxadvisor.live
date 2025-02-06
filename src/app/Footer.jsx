import React from 'react';
import Link from 'next/link'; // For navigation
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-branding">
          <h1 className="footer-title" style={{ color: 'white' }}>Simplifying USA Taxation</h1>
          <p className="footer-tagline">
            Making tax calculations easier, faster, and smarter.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="footer-links">
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </nav>

        {/* Right Section with Social Media */}
        <div className="footer-social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tax Advisor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
