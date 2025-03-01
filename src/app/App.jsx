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
import AiContent from './AiContent';
import './Global.css';

const App = () => {
 
  const [country, setCountry] = useState('');
  const [income, setIncome] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
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

      const data = await response.json(); 
      return data.result; 
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching AI content');
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setAdvice('');          
    setError('');           
    setLoading(true);       

    try {
    
      const result = await getAIContent(`Tax advice for ${country} with income ${income}`);
      setAdvice(result);    
    } catch (err) {
      console.error('Error fetching tax advice:', err);
      setError('Failed to fetch tax advice. Please try again later.'); 
    } finally {
      setLoading(false);     
    }
  };

  return (
    <Router>
      <div className="app-container">
                <Header />

                <main className="main-content">
          <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/ai" element={<AiContent />} />

                        <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />

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

                        <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </main>

                <Footer />
      </div>
    </Router>
  );
};

export default App;
