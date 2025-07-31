import React from 'react';
import { motion } from 'framer-motion';
import { Container, Section } from '../components/layout/Container';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SEOEnhanced from '../components/SEOEnhanced';
import { useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import { EnhancedCard, CardHeader, CardContent } from '../components/ui/Card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    // Handle form submission
    console.log('Form submitted:', data);
    // Here you would typically send data to your API
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "contact@taxadvisor.live",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Business Ave, Suite 100",
      description: "New York, NY 10001"
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Monday - Friday",
      description: "9:00 AM - 6:00 PM EST"
    }
  ];

  return (
    <>
      <SEOEnhanced 
        title="Contact Us - TaxAdvisor"
        description="Get in touch with TaxAdvisor for expert tax consultation, support, and professional services. We're here to help with all your tax needs."
        keywords="contact taxadvisor, tax consultation, support, tax services, professional help"
        url="https://taxadvisor.live/contact"
      />
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <Section padding="xl" className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
            <Container>
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp} 
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
                  Contact Us
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We're here to help with all your tax needs. Whether you have questions about our services, 
                  need professional consultation, or want to explore partnership opportunities, our expert team is ready to assist.
                </p>
              </motion.div>
            </Container>
          </Section>

          {/* Contact Information Cards */}
          <Section padding="lg">
            <Container>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              >
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div key={index} variants={fadeInUp}>
                      <EnhancedCard className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                            <IconComponent className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                          <p className="text-primary font-medium mb-1">{item.info}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </EnhancedCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            </Container>
          </Section>

          {/* Contact Form Section */}
          <Section padding="lg" className="bg-muted/20">
            <Container>
              <div className="max-w-4xl mx-auto">
                <motion.div 
                  initial="hidden" 
                  animate="visible" 
                  variants={fadeInUp} 
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Send Us a Message</h2>
                  <p className="text-lg text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                    <EnhancedCard>
                      <CardHeader>
                        <h3 className="text-xl font-semibold">Get in Touch</h3>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                                First Name *
                              </label>
                              <input 
                                {...register('firstName', { required: 'First name is required' })}
                                id="firstName" 
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                                placeholder="John"
                              />
                              {errors.firstName && <p className="mt-1 text-sm text-destructive">{errors.firstName.message}</p>}
                            </div>
                            
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                                Last Name *
                              </label>
                              <input 
                                {...register('lastName', { required: 'Last name is required' })}
                                id="lastName" 
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                                placeholder="Doe"
                              />
                              {errors.lastName && <p className="mt-1 text-sm text-destructive">{errors.lastName.message}</p>}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                              Email Address *
                            </label>
                            <input 
                              {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address'
                                }
                              })}
                              id="email" 
                              type="email"
                              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                              placeholder="john@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                              Phone Number
                            </label>
                            <input 
                              {...register('phone')}
                              id="phone" 
                              type="tel"
                              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>

                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                              Subject *
                            </label>
                            <input 
                              {...register('subject', { required: 'Subject is required' })}
                              id="subject" 
                              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                              placeholder="How can we help you?"
                            />
                            {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                              Message *
                            </label>
                            <textarea 
                              {...register('message', { required: 'Message is required' })}
                              id="message" 
                              rows="5"
                              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-vertical"
                              placeholder="Tell us more about your tax needs..."
                            />
                            {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
                          </div>

                          <Button type="submit" size="lg" variant="gradient" className="w-full">
                            Send Message
                          </Button>
                        </form>
                      </CardContent>
                    </EnhancedCard>
                  </motion.div>

                  {/* Additional Information */}
                  <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-6">
                    <EnhancedCard>
                      <CardHeader>
                        <h3 className="text-xl font-semibold">Why Choose TaxAdvisor?</h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium">Expert Consultation</h4>
                            <p className="text-sm text-muted-foreground">Professional tax experts with years of experience</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium">Quick Response</h4>
                            <p className="text-sm text-muted-foreground">We respond to all inquiries within 24 hours</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium">Secure & Confidential</h4>
                            <p className="text-sm text-muted-foreground">Your information is always protected and confidential</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium">Personalized Service</h4>
                            <p className="text-sm text-muted-foreground">Tailored solutions for your unique tax situation</p>
                          </div>
                        </div>
                      </CardContent>
                    </EnhancedCard>

                    <EnhancedCard>
                      <CardHeader>
                        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <details className="group">
                          <summary className="flex justify-between items-center cursor-pointer font-medium py-2 hover:text-primary transition-colors">
                            How quickly will I receive a response?
                            <span className="ml-2 transition-transform group-open:rotate-180">↓</span>
                          </summary>
                          <p className="text-sm text-muted-foreground mt-2 pb-2">
                            We typically respond to all inquiries within 24 hours during business days.
                          </p>
                        </details>
                        
                        <details className="group">
                          <summary className="flex justify-between items-center cursor-pointer font-medium py-2 hover:text-primary transition-colors">
                            Do you offer free consultations?
                            <span className="ml-2 transition-transform group-open:rotate-180">↓</span>
                          </summary>
                          <p className="text-sm text-muted-foreground mt-2 pb-2">
                            Yes, we offer a complimentary 15-minute consultation to discuss your tax needs.
                          </p>
                        </details>
                        
                        <details className="group">
                          <summary className="flex justify-between items-center cursor-pointer font-medium py-2 hover:text-primary transition-colors">
                            Is my information secure?
                            <span className="ml-2 transition-transform group-open:rotate-180">↓</span>
                          </summary>
                          <p className="text-sm text-muted-foreground mt-2 pb-2">
                            Absolutely. We use industry-standard encryption and follow strict confidentiality protocols.
                          </p>
                        </details>
                      </CardContent>
                    </EnhancedCard>
                  </motion.div>
                </div>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
