'use client';

import { useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Container, Section, Grid, Flex } from './components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/EnhancedCard';
import Button from './components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import TaxCalculator from './TaxCalculator';
import SmartTaxBot from './components/SmartTaxBot';
import { BuyMeCoffee } from './components/BuyMeCoffee';
import SEOEnhanced from './components/SEOEnhanced';
import './globals.css';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: "📊",
      title: "Advanced Tax Calculator",
      description: "Calculate your taxes with precision using our state-of-the-art algorithms and real-time tax rates."
    },
    {
      icon: "🤖",
      title: "AI-Powered SmartTaxBot",
      description: "Get instant answers to your tax questions from our intelligent chatbot trained on tax regulations."
    },
    {
      icon: "📰",
      title: "Real-Time Tax News",
      description: "Stay updated with the latest tax law changes, deadlines, and financial news that affects you."
    },
    {
      icon: "📚",
      title: "Expert Tax Blog",
      description: "Read insights from tax professionals and learn strategies to optimize your tax planning."
    }
  ];

  return (
    <>
      <SEOEnhanced 
        title="TaxAdvisor - Professional Tax Solutions & Financial Planning"
        description="Get expert tax advice, use our advanced tax calculator, read latest tax news, and chat with our AI-powered SmartTaxBot. Simplify your tax planning with TaxAdvisor."
        keywords="tax advisor, tax calculator, tax planning, financial advisor, tax news, AI tax bot, tax software, income tax, professional tax services"
        url="https://taxadvisor.live"
      />

      <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <BuyMeCoffee />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <Section padding="xl" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-background dark:to-purple-900/20">
            <Container>
              <motion.div
                ref={heroRef}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="text-center"
              >
                <motion.div variants={fadeInUp} className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
                    🚀 Professional Tax Solutions Made Simple
                  </div>
                </motion.div>
                
                <motion.h1 
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
                >
                  Your Trusted Tax
                  <br />
                  <span className="text-foreground">Advisor Platform</span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
                >
                  Simplify your tax planning with our comprehensive suite of tools. From advanced calculations to AI-powered advice, 
                  we've got everything you need to make informed financial decisions.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="xl" variant="gradient" className="min-w-[200px]">
                    Get Started Free
                  </Button>
                  <Button size="xl" variant="outline" className="min-w-[200px]">
                    Watch Demo
                  </Button>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="mt-12">
                  <p className="text-sm text-muted-foreground mb-4">Trusted by 10,000+ users worldwide</p>
                  <div className="flex justify-center items-center space-x-8 opacity-60">
                    <div className="text-2xl font-bold">⭐⭐⭐⭐⭐</div>
                    <div className="text-sm">4.9/5 Rating</div>
                  </div>
                </motion.div>
              </motion.div>
            </Container>
          </Section>

          {/* Features Section */}
          <Section padding="xl">
            <Container>
              <motion.div
                ref={featuresRef}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Everything You Need for Tax Success
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Our comprehensive platform combines cutting-edge technology with expert knowledge 
                    to deliver unparalleled tax solutions.
                  </p>
                </motion.div>
                
                <Grid cols={2} gap="lg" className="lg:grid-cols-4">
                  {features.map((feature, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card variant="elevated" className="h-full hover:shadow-hard transition-all duration-300 group">
                        <CardContent className="p-8 text-center">
                          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Grid>
              </motion.div>
            </Container>
          </Section>

          {/* Tax Calculator Section */}
          <Section padding="xl" className="bg-muted/30">
            <Container>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.1 }}
                variants={fadeInUp}
              >
                <Card variant="glass" className="backdrop-blur-xl">
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                      Advanced Tax Calculator
                    </CardTitle>
                    <p className="text-muted-foreground text-lg">
                      Get accurate tax calculations in seconds with our intelligent calculator
                    </p>
                  </CardHeader>
                  <CardContent>
                    <TaxCalculator />
                  </CardContent>
                </Card>
              </motion.div>
            </Container>
          </Section>

          {/* CTA Section */}
          <Section padding="xl" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Container>
              <motion.div
                ref={ctaRef}
                initial="hidden"
                animate={ctaInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="text-center"
              >
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Simplify Your Taxes?
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who trust TaxAdvisor for their tax planning needs. 
                  Get personalized advice from our AI-powered SmartTaxBot.
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Dialog open={showChat} onOpenChange={setShowChat}>
                    <DialogTrigger asChild>
                      <Button size="xl" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                        🤖 Talk to SmartTaxBot Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">SmartTaxBot - Your AI Tax Assistant</DialogTitle>
                      </DialogHeader>
                      <div className="h-[70vh]">
                        <SmartTaxBot />
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              </motion.div>
            </Container>
          </Section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
