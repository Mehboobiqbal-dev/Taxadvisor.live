"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setSubmitSuccess(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | TaxAdvisor</title>
        <meta
          name="description"
          content="Get in touch with TaxAdvisor for accurate tax calculations, expert advice, and financial insights. Our team is here to assist you."
        />
        <meta name="keywords" content="contact tax advisor, contact us, tax assistance, tax inquiries" />
        <meta property="og:title" content="Contact Us | TaxAdvisor" />
        <meta property="og:description" content="Get in touch with TaxAdvisor for accurate tax calculations and expert advice." />
        <meta property="og:url" content="https://taxadvisor.live/contact" />
        <meta name="twitter:title" content="Contact Us | TaxAdvisor" />
        <meta name="twitter:description" content="Reach out to TaxAdvisor for expert tax assistance and advice." />
        <meta name="twitter:card" content="summary" />
      </Head>

      <Header />
      <main className="bg-muted/40 py-20">
        <div className="container">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              {submitSuccess && (
                <Alert className="mb-4">
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your message has been sent successfully!
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    aria-label="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    aria-label="Your email address"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    aria-label="Your message"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
