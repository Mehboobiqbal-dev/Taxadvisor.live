"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Header from "./Header"; // Ensure correct path
import Footer from "./Footer"; // Ensure correct path
import SmartTaxBot from './components/SmartTaxBot'; // Adjust path if needed
import './Home.css';

const Home = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* SEO Meta Tags using Next.js Head */}
      <Head>
      <meta name="google-site-verification" content="wLF0iQsjbx3PcKcGjJIFnZEC8GX_kUCWA7oz4JKJtjA" />
        <title>TaxAdvisor - Accurate Tax Calculations & Expert Advice</title>
        <meta
          name="description"
          content="TaxAdvisor is your go-to online tool for accurate tax calculations, expert tax advice, and financial insights. Maximize your refund with our smart tax chatbot and up-to-date tax news."
        />
        <meta
          name="keywords"
          content="tax advisor, tax calculator, tax advice, tax refund, tax deductions, tax credits, tax news, smart tax chatbot"
        />
        <meta
          property="og:title"
          content="TaxAdvisor - Accurate Tax Calculations & Expert Advice"
        />
        <meta
          property="og:description"
          content="Get precise tax calculations and expert financial insights with TaxAdvisor. Chat with our AI-powered tax chatbot for instant help!"
        />
        <meta
          property="og:url"
          content="https://taxadviser.live/"
        />
        <meta
          property="og:image"
          content="https://taxadviser.live/images/photo.jpg" // Updated path to image in public folder
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TaxAdvisor - Accurate Tax Calculations & Expert Advice" />
        <meta name="twitter:description" content="Get accurate tax calculations and advice with TaxAdvisor. Our smart chatbot helps you get instant tax advice!" />
        <meta name="twitter:image" content="https://taxadviser.live/images/photo.jpg" /> {/* Updated path */}
        <link rel="canonical" href="https://taxadviser.live/" />
        
        {/* Favicon and Logo for Tab */}
        <link rel="icon" href="/images/photo.jpg" />
        <link rel="apple-touch-icon" href="/images/photo.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/photo.jpg" />

        {/* JSON-LD for FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "SmartTaxBot - AI Tax Assistant",
              "description": "SmartTaxBot is an AI-powered chatbot that helps users with tax-related questions and advice.",
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntityOfPage": "https://taxadviser.live",
                "name": "Frequently Asked Questions about Taxes",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ask any tax question, and SmartTaxBot will provide an AI-generated response."
                }
              }
            }),
          }}
        />
      </Head>

      {/* Include Header */}
      <Header />

      {/* Main Content */}
      <main className="home">
        <section className="home-intro text-center p-10">
          <h1 className="text-3xl font-bold">Welcome to Tax Advisor</h1>
          <p className="text-gray-600 mt-2">
            Your go-to online tool for tax calculations, expert tax advice, and financial insights!
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section className="home-intro p-10">
          <h2 className="text-2xl font-bold">Why Choose Tax Advisor?</h2>
          <p className="text-gray-600">
            We help you calculate taxes quickly and easily with expert assistance on deductions, credits, refunds, and more.
          </p>
          <ul className="list-disc ml-6 mt-4">
            <li><strong>Accurate Tax Calculations:</strong> Get precise estimates based on your income and deductions.</li>
            <li><strong>SmartTaxBot:</strong> Instant answers from our AI-powered chatbot.</li>
            <li><strong>Real-Time Tax News:</strong> Stay updated with the latest tax laws.</li>
          </ul>
        </section>

        {/* Talk to TaxGPT Button in Red Box */}
        <section className="home-intro p-10">
          <h2 className="text-2xl font-bold">Talk to SmartTaxBot</h2>
          <p className="text-gray-600">
            Have questions? Let our AI-powered chatbot, SmartTaxBot, assist you with tax calculations, advice, and more.
          </p>
          <button 
            className="bg-red-500 text-white py-2 px-4 mt-4 rounded-lg"
            onClick={() => setShowChat(!showChat)}
          >
            {showChat ? 'Close Chat' : 'Talk to SmartTaxBot'}
          </button>
        </section>

        {/* SmartTaxBot Chat Component */}
        {showChat && (
          <div className="fixed bottom-4 right-4 p-4 bg-red-500 shadow-lg rounded-lg w-80 md:w-96">
            <SmartTaxBot />
          </div>
        )}
      </main>

      {/* Include Footer */}
      <Footer />
    </>
  );
};

export default Home;
