import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <section className="py-20 text-center bg-primary text-primary-foreground">
          <div className="container">
            <h1 className="text-5xl font-bold tracking-tight">About TaxAdvisor</h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Simplifying tax management for all Americans.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-4xl font-bold tracking-tight">Our Mission</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our mission is to simplify tax management for all Americans. We strive to empower users with the tools
              and resources they need to understand and optimize their tax situation effortlessly.
            </p>
          </div>
        </section>

        <section className="py-20 bg-muted/40">
          <div className="container">
            <h2 className="text-4xl font-bold tracking-tight text-center">Key Features</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Tax Calculators</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Federal, state, and local tax calculations at your fingertips.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Tax News</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Stay updated with tax law changes and economic policies.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Intelligent TaxGPT</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get instant answers to your tax-related queries.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Secure & Reliable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your data is protected with industry-leading security measures.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-4xl font-bold tracking-tight">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              At Tax Advisor, we understand the complexities of tax regulations in the United States. Our platform
              is designed to make filing and managing taxes as stress-free as possible, whether you're an individual
              filer or a business owner.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Join thousands of users who trust Tax Advisor for accurate, efficient, and user-friendly tax assistance.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
