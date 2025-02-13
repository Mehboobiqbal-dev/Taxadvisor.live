// src/app/page.jsx
'use client';

import Script from 'next/script'; // Import Next.js Script component
import Header from './Header';
import Footer from './Footer';
import TaxCalculator from './TaxCalculator';
import { BuyMeCoffee } from './components/BuyMeCoffee';
import SmartTaxBot from './components/SmartTaxBot';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // Global styles including Tailwind directives

export default function Home() {
  return (
    <>
      {/* Google AdSense Script using Next.js Script component */}
      <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <title>TaxAdvisor - Professional Tax Solutions</title>
      <meta
        name="description"
        content="TaxAdvisor offers professional tax and financial solutions. Get the latest tools and advice to manage your taxes efficiently."
      />

      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Header with Logo */}
        <Header>
          <div className="flex justify-center items-center py-4">
            <img
              src="https://i.ibb.co/vxKbKLHT/photo.jpg"
              alt="TaxAdvisor Logo"
              className="h-12"
            />
          </div>
        </Header>

        {/* Buy Me Coffee Component */}
        <BuyMeCoffee />

        {/* Main Content */}
        <main className="flex-grow p-6 container mx-auto">
          <TaxCalculator />
          <SmartTaxBot />
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </>
  );
}
