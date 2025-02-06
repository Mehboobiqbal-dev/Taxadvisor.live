import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import News from './Newslist';
import TaxCalculator from './TaxCalculator';
import Chatbot from './Chatbot';
import About from './About';
import Privacy from './Privacy';
import Contact from './Contact';
import Home from './Home';
import AiContent from './AiContent'; // AI content page import
import './Global.css';

const App = () => {
  // State variables for tax calculator form and API response
  const [country, setCountry] = useState('');
  const [income, setIncome] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API call function for AI content
  const getAIContent = async (query) => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI content');
      }

      const data = await response.json(); // Assuming the response returns a JSON object
      return data.result; // Modify this according to the structure of your API response
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching AI content');
    }
  };

  // Handle form submission to fetch AI content (tax advice)
  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent the default form action
    setAdvice('');           // Reset advice before new submission
    setError('');            // Reset error state before new submission
    setLoading(true);        // Set loading state while API is being called

    try {
      // Fetch AI content with a request string
      const result = await getAIContent(`Tax advice for ${country} with income ${income}`);
      setAdvice(result);      // Set the result in state as advice
    } catch (err) {
      console.error('Error fetching tax advice:', err);
      setError('Failed to fetch tax advice. Please try again later.');  // Display error message
    } finally {
      setLoading(false);      // Stop loading spinner after API call
    }
  };

  return (
    <Router>
      <div className="app-container">
        {/* Header Component */}
        <Header />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* AI Content Route */}
            <Route path="/ai" element={<AiContent />} />

            {/* Other Routes */}
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />

            {/* Tax Calculator Route */}
            <Route
              path="/tax-calculator"
              element={
                <TaxCalculator
                  country={country}
                  setCountry={setCountry}
                  income={income}
                  setIncome={setIncome}
                  advice={advice}
                  error={error}
                  loading={loading}
                  handleSubmit={handleSubmit}
                />
              }
            />

            {/* Chatbot Route */}
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
