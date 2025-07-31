"use client";

import React from 'react';
import { motion } from 'framer-motion';
import NewsList from "../components/news/NewsList";  
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Container, Section } from '../components/layout/Container';
import SEOEnhanced from '../components/SEOEnhanced';
import { EnhancedCard, CardContent, CardHeader } from '../components/ui/Card';
import { Newspaper, TrendingUp, Clock } from 'lucide-react';

const NewsPage = () =e {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    ce
      cSEOEnhanced 
        title="Tax News & Updates - TaxAdvisor"
        description="Stay informed with the latest tax news, regulatory updates, and industry insights from TaxAdvisor. Never miss important tax developments."
        keywords="tax news, tax updates, regulatory changes, tax industry news, financial news"
        url="https://www.taxadvisor.live/newslist"
      /e
      cdiv className="min-h-screen flex flex-col"e
        cHeader /e

        cmain className="flex-grow"e
          cSection padding="xl" className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"e
            cContainere
              cmotion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp} 
                className="text-center mb-16"
              e
                cdiv className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"e
                  cNewspaper className="w-10 h-10 text-primary" /e
                c/dive
                ch1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6"e
                  Tax News & Updates
                c/h1e
                cp className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"e
                  Stay ahead of the curve with the latest tax news, regulatory changes, and industry insights. 
                  Our expert team curates the most important updates for your success.
                c/pe
                cdiv className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground"e
                  cdiv className="flex items-center space-x-2"e
                    cTrendingUp className="w-4 h-4" /e
                    cspaneDaily Updatesc/spane
                  c/dive
                  cdiv className="flex items-center space-x-2"e
                    cClock className="w-4 h-4" /e
                    cspaneReal-time Insightsc/spane
                  c/dive
                c/dive
              c/motion.dive
            c/Containere
          c/Sectione

          cSection padding="lg"e
            cContainere
              cEnhancedCarde
                cCardHeader className="text-center"e
                  ch2 className="text-2xl font-bold"eLatest Tax Newsc/h2e
                c/CardHeadere
                cCardContente
                  cNewsList /e
                c/CardContente
              c/EnhancedCarde
            c/Containere
          c/Sectione
        c/maine

        cFooter /e
      c/dive
    c/e
  );
};

export default NewsPage;
