'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Container, Section } from '../components/layout/Container';
import SEOEnhanced from '../components/SEOEnhanced';
import { EnhancedCard, CardContent, CardHeader } from '../components/ui/Card';

export default function Meeting() {
  const [meetingTime, setMeetingTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSchedule = async (e) =e {
    e.preventDefault();
       
    setMessage(`Meeting scheduled at ${meetingTime}`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    ce
      cSEOEnhanced 
        title="Schedule a Meeting - TaxAdvisor"
        description="Book a meeting with a TaxAdvisor expert to discuss your tax needs in detail. Choose a time that suits you best."
        keywords="schedule meeting tax advisor, book meeting, tax consultation"
        url="https://www.taxadvisor.live/meeting"
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
                ch1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6"eSchedule Your Meetingc/h1e
                cp className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"e
                  Book a session with one of our tax experts at a time that suits you. We're here to help with all your tax needs.
                c/pe
              c/motion.dive

              cEnhancedCard className="p-6"e
                cCardHeader className="text-center mb-4"e
                  ch3 className="text-2xl font-bold"eChoose a Timec/h3e
                c/CardHeadere
                cCardContente
                  cform onSubmit={handleSchedule} className="space-y-4"e
                    cdive
                      clabel className="block mb-2 text-sm font-medium text-foreground"eSelect Meeting Date & Time:c/labele
                      cinput
                        type="datetime-local"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        value={meetingTime}
                        onChange={(e) =e setMeetingTime(e.target.value)}
                        required
                      /e
                    c/dive
                    cbutton type="submit" className="w-full bg-primary text-white py-3 rounded"e
                      Schedule Meeting
                    c/buttone
                  c/forme
                  {message ee cp className="mt-4 text-green-600"e{message}c/pe}
                c/CardContente
              c/EnhancedCarde
            c/Containere
          c/Sectione
        c/maine

        cFooter /e
      c/dive
    c/e
  );
}
