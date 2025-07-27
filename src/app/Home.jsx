"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Header from "./Header"; 
import Footer from "./Footer"; 
import { BuyMeCoffee } from './components/BuyMeCoffee';
import SmartTaxBot from './components/SmartTaxBot'; 
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { CheckCircle } from 'lucide-react';

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
      <main className="bg-muted/40">
        <section className="py-20 text-center">
          <div className="container">
            <h1 className="text-5xl font-bold tracking-tight">Welcome to TaxAdvisor</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your one-stop online tool for tax calculations, expert advice, insightful tax blogs, and real-time tax news.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Accurate Tax Calculations</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get precise estimates based on your income and deductions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expert Tax Advice</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Benefit from years of financial expertise to optimize your tax returns.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>SmartTaxBot</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Instant answers from our AI-powered chatbot that assists you with every tax aspect.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight">Learn with Our Tax Blog</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our Tax Blog is packed with expert articles, practical guides, and insider tips on reducing your tax liability, filing your taxes correctly, and navigating complex tax regulations.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Maximize Deductions</h3>
                  <p className="text-muted-foreground">Learn how to maximize your deductions and credits.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Filing Guides</h3>
                  <p className="text-muted-foreground">Step-by-step guides on filing taxes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Tax Reforms</h3>
                  <p className="text-muted-foreground">Latest updates on tax reforms and policies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-4xl font-bold tracking-tight">Talk to SmartTaxBot</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have tax-related questions or need personalized advice? Let our AI-powered chatbot, SmartTaxBot, assist you.
            </p>
            <Dialog open={showChat} onOpenChange={setShowChat}>
              <DialogTrigger asChild>
                <Button size="lg" className="mt-8">Talk to SmartTaxBot</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>SmartTaxBot</DialogTitle>
                </DialogHeader>
                <div className="h-[60vh]">
                  <SmartTaxBot />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
