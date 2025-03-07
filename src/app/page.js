'use client';


import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import Footer from './Footer';
import TaxCalculator from './TaxCalculator';
import SmartTaxBot from './components/SmartTaxBot';
import { BuyMeCoffee } from './components/BuyMeCoffee';
import Image from 'next/image';


import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
export default function Home() {
  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-adsense-account" content="ca-pub-2663142027592405" />
        <title>TaxAdvisor - Professional Tax Solutions</title>
        <meta
          name="description"
          content="TaxAdvisor offers professional tax and financial solutions. Get the latest tools and advice to manage your taxes efficiently."
        />
        <meta
          name="keywords"
          content="tax solutions, professional tax advice, financial tools, tax calculator, tax news, smart tax bot"
        />
        <meta
          property="og:title"
          content="TaxAdvisor - Professional Tax Solutions"
        />
        <meta
          property="og:description"
          content="Get the latest tools and advice from TaxAdvisor to manage your taxes efficiently."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/vxKbKLHT/photo.jpg"
        />
        <meta property="og:url" content="https://taxadvisor.live" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="TaxAdvisor - Professional Tax Solutions"
        />
        <meta
          name="twitter:description"
          content="Get the latest tools and advice from TaxAdvisor to manage your taxes efficiently."
        />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/vxKbKLHT/photo.jpg"
        />
        <meta name="twitter:creator" content="@TaxAdvisorLive" />
        <link rel="canonical" href="https://taxadvisor.live" />
        <meta name="robots" content="index, follow" />
      </Head>

            <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

            

      <div className="min-h-screen flex flex-col bg-gray-100">
                <Header>
          <div className="flex justify-center items-center py-4">
            <Image
              src="https://i.ibb.co/vxKbKLHT/photo.jpg"
              alt="TaxAdvisor Logo"
              width={48}     
              height={48}     
              priority      
              className="h-12" 
            />
          </div>
        </Header>
                 
                <BuyMeCoffee />

                <main className="flex-grow p-6 container mx-auto">
          <TaxCalculator />
          <SmartTaxBot />
          
        </main>

                <Footer />
      </div>
    </>
  );
}
