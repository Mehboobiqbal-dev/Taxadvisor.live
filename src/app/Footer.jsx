import React from 'react';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground" role="contentinfo">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        {/* Branding */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="https://i.ibb.co/vxKbKLHT/photo.jpg" alt="TaxAdvisor Logo" className="h-10 w-10 rounded-full border-2 border-primary/50 shadow-sm" />
            <span className="text-xl font-bold tracking-tight">TaxAdvisor</span>
          </div>
          <p className="text-muted-foreground">Simplifying USA Taxation</p>
          <p className="text-sm text-muted-foreground">Making tax calculations easier, faster, and smarter.</p>
        </div>
        {/* Footer Links */}
        <nav className="flex flex-col gap-4" aria-labelledby="footer-navigation">
          <h2 id="footer-navigation" className="text-lg font-semibold">Quick Links</h2>
          <ul className="flex flex-col gap-2">
            <li><Link href="/about" aria-label="About Us" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" aria-label="Contact Us" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/privacy" aria-label="Privacy Policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </nav>
        {/* Social */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <a
            href="https://www.linkedin.com/in/mehboob-iqbal-3b1263190"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mehboob Iqbal on LinkedIn"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span>Founder on LinkedIn</span>
          </a>
        </div>
      </div>
      <div className="bg-muted text-muted-foreground">
        <div className="container py-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Tax Advisor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
