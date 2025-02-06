"use client";

import TaxCalculator from "../TaxCalculator";  // Adjust import path if needed

const Calculateyoutax = () => {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Tax Calculator</h1>
      <TaxCalculator /> 
    </div>
  );
};

export default Calculateyoutax;