"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";

const Contact = () => {

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  }, []);

 
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

      <div id="contact" style={{ padding: "20px" }}>
        <h2>Contact Us</h2>

        {submitSuccess && (
          <div
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
            }}
          >
            Your message has been sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <section style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              aria-label="Your full name"
            />
          </section>

          <section style={{ marginBottom: "15px" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              aria-label="Your email address"
            />
          </section>

          <section style={{ marginBottom: "15px" }}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="5"
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              aria-label="Your message"
            />
          </section>

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
