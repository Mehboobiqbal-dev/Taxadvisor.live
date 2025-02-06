import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1 style={{color: 'white'}}>Welcome to USA Tax Advisor</h1>
        <p>Your go-to online tool for tax calculations, tax advice, and financial insights!</p>
      </header>

      <section className="home-intro">
        <h2>Why Choose USA Tax Advisor?</h2>
        <p>USA Tax Advisor helps you calculate taxes quickly and easily with expert assistance on deductions, credits, refunds, and more.</p>
        <ul>
          <li><strong>Accurate Tax Calculations:</strong> Get accurate estimates on your taxes based on income, filing status, and deductions.</li>
          <li><strong>Smart Tax Chatbot:</strong> Ask your tax-related questions to our intelligent chatbot, designed to provide instant and accurate answers, guidance, and support for your tax filing process.</li>
          <li><strong>Real-Time Tax News:</strong> Stay up-to-date with the latest tax regulations, updates, and news from the USA, Canada, and the UK to help you stay informed and plan effectively.</li>
        </ul>
      </section>

      <section className="home-call-to-action">
        <h2>Get Started Now!</h2>
        <p>Whether you're a single filer or married, we’ve got the tools to help you get the maximum refund you deserve!</p>
        <Link to="/chatbot" className="cta-btn">Talk to Our Tax Chatbot</Link>
      </section>

     
     
    </div>
  );
};

export default Home;
