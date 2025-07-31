'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Section, Grid } from '../components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/EnhancedCard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEOEnhanced from '../components/SEOEnhanced';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Wilson',
      role: 'Chief Executive Officer',
      bio: 'Visionary leader with 20+ years in financial technology and tax consulting.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b000?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer', 
      bio: 'AI and machine learning expert passionate about innovative tax solutions.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Tax Strategy',
      bio: 'CPA with extensive experience in complex tax regulations and compliance.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Accuracy',
      description: 'We ensure precise calculations and up-to-date tax information for reliable results.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI technology to simplify complex tax processes.'
    },
    {
      icon: '🔒',
      title: 'Security',
      description: 'Your financial data is protected with enterprise-grade security measures.'
    },
    {
      icon: '💡',
      title: 'Simplicity',
      description: 'Making tax planning accessible and understandable for everyone.'
    }
  ];

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

  return (
    <>
      <SEOEnhanced 
        title="About TaxAdvisor - Your Trusted Tax Planning Partner"
        description="Learn about TaxAdvisor's mission to simplify tax planning through innovative technology. Meet our expert team and discover our core values."
        keywords="about taxadvisor, tax planning company, tax software team, financial technology"
        url="https://taxadvisor.live/about"
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <Section padding="xl" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-background dark:to-purple-900/20">
            <Container>
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={staggerContainer}
                className="text-center"
              >
                <motion.div variants={fadeInUp} className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
                    🏢 About TaxAdvisor
                  </div>
                </motion.div>
                
                <motion.h1 
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                >
                  Revolutionizing Tax Planning
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Through Innovation
                  </span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                >
                  At TaxAdvisor, we're committed to making tax planning accessible, accurate, and stress-free. 
                  Our cutting-edge technology and expert knowledge combine to deliver unparalleled tax solutions.
                </motion.p>
              </motion.div>
            </Container>
          </Section>

          {/* Mission Section */}
          <Section padding="xl">
            <Container>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.1 }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    To democratize professional tax planning by providing intelligent, 
                    user-friendly tools that empower individuals and businesses to make informed financial decisions.
                  </p>
                </motion.div>

                <Grid cols={2} gap="lg" className="lg:grid-cols-4">
                  {values.map((value, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card variant="elevated" className="h-full text-center hover:shadow-hard transition-all duration-300 group">
                        <CardContent className="p-8">
                          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {value.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Grid>
              </motion.div>
            </Container>
          </Section>

          {/* Team Section */}
          <Section padding="xl" className="bg-muted/30">
            <Container>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.1 }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Leadership Team</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Our diverse team of experts brings together decades of experience in finance, 
                    technology, and tax consulting to serve you better.
                  </p>
                </motion.div>
                
                <Grid cols={1} gap="lg" className="md:grid-cols-2 lg:grid-cols-3">
                  {teamMembers.map((member, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <Card variant="glass" className="h-full hover:shadow-hard transition-all duration-300">
                        <CardHeader className="text-center p-8">
                          <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardTitle className="text-xl mb-2">{member.name}</CardTitle>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{member.role}</p>
                        </CardHeader>
                        <CardContent className="text-center px-8 pb-8">
                          <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Grid>
              </motion.div>
            </Container>
          </Section>

          {/* Stats Section */}
          <Section padding="xl" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Container>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.1 }}
                variants={staggerContainer}
                className="text-center"
              >
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-12">
                  Trusted by Thousands
                </motion.h2>
                
                <Grid cols={2} gap="lg" className="lg:grid-cols-4">
                  {[
                    { number: '50K+', label: 'Happy Users' },
                    { number: '1M+', label: 'Tax Calculations' },
                    { number: '99.9%', label: 'Accuracy Rate' },
                    { number: '24/7', label: 'AI Support' }
                  ].map((stat, index) => (
                    <motion.div key={index} variants={fadeInUp} className="text-center">
                      <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                      <div className="text-blue-100 text-lg">{stat.label}</div>
                    </motion.div>
                  ))}
                </Grid>
              </motion.div>
            </Container>
          </Section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
