"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Header from "./Header"; 
import Footer from "./Footer"; 
import { BuyMeCoffee } from './components/BuyMeCoffee';
import SmartTaxBot from './components/SmartTaxBot'; 
import './Home.css';

const Home = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
            <Head>
        <meta name="google-site-verification" content="wLF0iQsjbx3PcKcGjJIFnZEC8GX_kUCWA7oz4JKJtjA" />
        <title>TaxAdvisor - Accurate Tax Calculations & Expert Advice</title>
        <meta
          name="description"
          content="TaxAdvisor is your go-to online tool for accurate tax calculations, expert tax advice, and financial insights. Maximize your refund with our smart tax chatbot, learn to reduce your tax liability, and stay updated with daily tax news."
        />
        <meta
          name="keywords"
          content="tax advisor, tax calculator, tax advice, tax refund, tax deductions, tax credits, tax news, smart tax chatbot, file taxes, reduce taxes"
        />
        <meta
          property="og:title"
          content="TaxAdvisor - Accurate Tax Calculations & Expert Advice"
        />
        <meta
          property="og:description"
          content="Get precise tax calculations and expert financial insights with TaxAdvisor. Chat with our AI-powered SmartTaxBot, learn tax reduction tips, filing guides, and stay updated with daily tax news!"
        />
        <meta
          property="og:url"
          content="https://taxadvisor.live/home"
        />
        <meta
          property="og:image"
          content="https://taxadviser.live/images/photo.jpg" // Updated path to image in public folder
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TaxAdvisor - Accurate Tax Calculations & Expert Advice" />
        <meta name="twitter:description" content="Get accurate tax calculations and advice with TaxAdvisor. Our smart chatbot, comprehensive tax blog, and daily news updates empower you to file taxes with confidence." />
        <meta name="twitter:image" content="https://taxadviser.live/images/photo.jpg" />         <link rel="canonical" href="https://taxadvisor.live/home" />

                <link rel="icon" href="/images/photo.jpg" />
        <link rel="apple-touch-icon" href="/images/photo.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/photo.jpg" />

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
                "mainEntityOfPage": "https://taxadvisor.live/SmartTaxBot",
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

            <Header />
      <BuyMeCoffee />
            <main className="home">
                <section className="home-intro text-center p-10">
          <h1 className="text-6xl font-bold">Welcome to TaxAdvisor</h1>
          <p className="mt-2 text-white bg-600 p-4 rounded">
            Your one-stop online tool for tax calculations, expert advice, insightful tax blogs, and real-time tax news. Discover smart ways to reduce your taxes and file them correctly with our comprehensive guides.
          </p>
        </section>

                <section className="home-intro p-10">
          <h2 className="text-2xl font-bold">Why Choose TaxAdvisor?</h2>
          <p className="mt-2 text-white bg-600 p-4 rounded">
            We provide you with accurate tax calculations, expert advice, and the latest tax news—all in one place. Whether you're looking for quick tax estimates or in-depth guidance, we've got you covered.
          </p>
          <ul className="list-disc ml-6 mt-4 text-white">
            <li><strong>Accurate Tax Calculations:</strong> Get precise estimates based on your income and deductions.</li>
            <li><strong>Expert Tax Advice:</strong> Benefit from years of financial expertise to optimize your tax returns.</li>
            <li><strong>SmartTaxBot:</strong> Instant answers from our AI-powered chatbot that assists you with every tax aspect.</li>
            <li><strong>Daily Tax News:</strong> Stay updated with the latest tax laws, policy changes, and deadlines.</li>
          </ul>
        </section>

                <section className="home-blog p-10 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Learn with Our Tax Blog</h2>
          <p className="mt-2 text-white">
            Our Tax Blog is packed with expert articles, practical guides, and insider tips on reducing your tax liability, filing your taxes correctly, and navigating complex tax regulations. Whether you're a first-time filer or a seasoned taxpayer, our blog offers something for everyone.
          </p>
          <p className="mt-2 text-white">
            Explore topics such as:
          </p>
          <ul className="list-disc ml-6 mt-2 text-white">
            <li>How to maximize your deductions and credits</li>
            <li>Step-by-step guides on filing taxes</li>
            <li>Latest updates on tax reforms and policies</li>
            <li>Strategies for reducing your overall tax burden</li>
          </ul>
        </section>

                <section className="home-news p-10 bg-gray-800 rounded-lg">
          <h2 className="text-white font-bold">Stay Informed with Daily Tax News</h2>
          <p className="mt-2 text-white bg-600 p-4 rounded">
            Keep up with the ever-changing world of taxes. Our platform provides you with daily updates on tax laws, important filing deadlines, and policy changes that could affect your finances. Stay ahead and make informed decisions with our real-time news feed.
          </p>
        </section>

                <section className="home-chat p-10">
          <h2 className="text-white font-bold">Talk to SmartTaxBot</h2>
          <p className="mt-2 text-white bg-600 p-4 rounded">
            Have tax-related questions or need personalized advice? Let our AI-powered chatbot, SmartTaxBot, assist you. Get instant responses and reliable guidance on everything from tax calculations to filing tips.
          </p>
          <button 
            className="bg-red-500 text-white py-2 px-4 mt-4 rounded-lg"
            onClick={() => setShowChat(!showChat)}
          >
            {showChat ? 'Close Chat' : 'Talk to SmartTaxBot'}
          </button>
        </section>

                {showChat && (
          <div className="fixed bottom-4 right-4 p-4 bg-red-500 shadow-lg rounded-lg w-80 md:w-96">
            <SmartTaxBot />
          </div>
        )}
      </main>

            <Footer />
    </>
  );
};

export default Home;
