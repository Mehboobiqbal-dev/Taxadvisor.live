import React from 'react';

const About = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Header Section */}
      <header className="bg-green-500 text-white text-center py-12">
        <h1 className="text-4xl font-bold">About Tax Advisor</h1>
      </header>

      {/* Mission Section */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Our mission is to simplify tax management for all Americans. We strive to empower users with the tools
          and resources they need to understand and optimize their tax situation effortlessly.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-2xl font-bold text-center">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold">Advanced Tax Calculators</h3>
            <p className="text-gray-700 mt-2">Federal, state, and local tax calculations at your fingertips.</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold">Real-time Tax News</h3>
            <p className="text-gray-700 mt-2">Stay updated with tax law changes and economic policies.</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold">Intelligent TaxGPT</h3>
            <p className="text-gray-700 mt-2">Get instant answers to your tax-related queries.</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold">Secure & Reliable</h3>
            <p className="text-gray-700 mt-2">Your data is protected with industry-leading security measures.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Why Choose Us?</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          At Tax Advisor, we understand the complexities of tax regulations in the United States. Our platform
          is designed to make filing and managing taxes as stress-free as possible, whether you're an individual
          filer or a business owner.
        </p>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Join thousands of users who trust Tax Advisor for accurate, efficient, and user-friendly tax assistance.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="bg-green-500 text-white text-center py-8">
        <p>&copy; {new Date().getFullYear()} Tax Advisor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
