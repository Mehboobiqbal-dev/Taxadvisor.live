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
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

import './globals.css'; 
export default function Home() {
  const [showChat, setShowChat] = useState(false);

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

      <div className="min-h-screen flex flex-col bg-muted/40">
        <Header />
        <BuyMeCoffee />
        <main className="flex-grow">
          <section className="py-20 text-center">
            <div className="container">
              <h1 className="text-5xl font-bold tracking-tight">Welcome to TaxAdvisor</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Your one-stop online tool for tax calculations, expert advice, insightful tax blogs, and real-time tax news.
              </p>
            </div>
          </section>

          <section className="py-20">
            <div className="container">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-3xl font-bold">Tax Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaxCalculator />
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-20 bg-background">
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
      </div>
    </>
  );
}
