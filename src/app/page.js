// src/app/Page.jsx or wherever your main page is defined
'use client'; // Marking this as a client component

import Header from "./Header";
import Footer from "./Footer";
import TaxCalculator from "./TaxCalculator";
import { NewsList } from "./NewsList";  
import { BuyMeCoffee } from './components/BuyMeCoffee';

import 'bootstrap/dist/css/bootstrap.min.css';
import ChatComponent from "./components/ChatComponent"; // Updated import

import "./globals.css"; // Global styles

const Home = () => {
  return (
    <div className="app-container">
      {/* Header Component */}
      <Header />
      <BuyMeCoffee />

      {/* Main Content */}
      <main className="main-content p-6">
        <TaxCalculator />
        <ChatComponent /> {/* ChatComponent for the chatbot */}
        <NewsList /> {/* Display the tax news component */}
       
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;
