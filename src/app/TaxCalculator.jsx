'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
ChartJS.register(ArcElement, ChartTooltip, Legend);

const federalTaxBrackets = [
  { min: 0, max: 9950, rate: 0.10 },
  { min: 9950, max: 40525, rate: 0.12 },
  { min: 40525, max: 86375, rate: 0.22 },
  { min: 86375, max: 164925, rate: 0.24 },
  { min: 164925, max: 209425, rate: 0.32 },
  { min: 209425, max: 523600, rate: 0.35 },
  { min: 523600, max: Infinity, rate: 0.37 },
];
const capitalGainsBrackets = [
  { min: 0, max: 44725, rate: 0.00 },
  { min: 44725, max: 492300, rate: 0.15 },
  { min: 492300, max: Infinity, rate: 0.20 },
];
const statesTaxRates = {
  AL: 0.04, AK: 0, AZ: 0.056, AR: 0.065, CA: 0.0725, CO: 0.029,
  CT: 0.0635, DE: 0, FL: 0.06, GA: 0.04, HI: 0.04, ID: 0.06,
  IL: 0.0625, IN: 0.07, IA: 0.06, KS: 0.065, KY: 0.06, LA: 0.0445,
  ME: 0.055, MD: 0.06, MA: 0.0625, MI: 0.06, MN: 0.06875, MS: 0.07,
  MO: 0.04225, MT: 0, NE: 0.055, NV: 0, NH: 0, NJ: 0.06625,
  NM: 0.05125, NY: 0.04, NC: 0.0475, ND: 0.05, OH: 0.0575, OK: 0.045,
  OR: 0, PA: 0.06, RI: 0.07, SC: 0.06, SD: 0.045, TN: 0.07,
  TX: 0.0625, UT: 0.0485, VT: 0.06, VA: 0.053, WA: 0, WV: 0.06,
  WI: 0.05, WY: 0,
};
const caTaxBrackets = [
  { min: 0, max: 9325, rate: 0.01 },
  { min: 9325, max: 22107, rate: 0.02 },
  { min: 22107, max: 34892, rate: 0.04 },
  { min: 34892, max: 48435, rate: 0.06 },
  { min: 48435, max: 61214, rate: 0.08 },
  { min: 61214, max: 312686, rate: 0.093 },
  { min: 312686, max: 375221, rate: 0.103 },
  { min: 375221, max: 625369, rate: 0.113 },
  { min: 625369, max: 1000000, rate: 0.123 },
  { min: 1000000, max: Infinity, rate: 0.133 },
];
const filingStatuses = [
  { label: 'Single', value: 'single', standardDeduction: 13850 },
  { label: 'Married Filing Jointly', value: 'married_joint', standardDeduction: 27700 },
  { label: 'Married Filing Separately', value: 'married_separate', standardDeduction: 13850 },
  { label: 'Head of Household', value: 'head', standardDeduction: 20800 },
];
const steps = [
  { label: 'Filing Status & Income', icon: '💼' },
  { label: 'Deductions', icon: '💸' },
  { label: 'Credits', icon: '🎁' },
  { label: 'State', icon: '🏛️' },
  { label: 'Results', icon: '📊' },
];
const calculateTaxFromBrackets = (income, brackets) => {
  let tax = 0;
  for (let bracket of brackets) {
    if (income > bracket.min) {
      const taxableAmount = Math.min(income, bracket.max) - bracket.min;
      tax += taxableAmount * bracket.rate;
    } else {
      break;
    }
  }
  return tax;
};
export default function TaxCalculator() {
  // State
  const [activeStep, setActiveStep] = useState(0);
  const [filingStatus, setFilingStatus] = useState('single');
  const [income, setIncome] = useState('');
  const [qualifiedDividends, setQualifiedDividends] = useState('');
  const [longTermGains, setLongTermGains] = useState('');
  const [medical, setMedical] = useState('');
  const [salt, setSalt] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [charity, setCharity] = useState('');
  const [business, setBusiness] = useState('');
  const [studentLoanInterest, setStudentLoanInterest] = useState('');
  const [retirementContributions, setRetirementContributions] = useState('');
  const [state, setState] = useState('CA');
  const [childTaxCredit, setChildTaxCredit] = useState('');
  const [eitc, setEitc] = useState('');
  const [educationCredit, setEducationCredit] = useState('');
  const [federalTaxAmount, setFederalTaxAmount] = useState(0);
  const [stateTaxAmount, setStateTaxAmount] = useState(0);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [deductionStrategy, setDeductionStrategy] = useState('Standard');
  const [error, setError] = useState('');

  // Calculation logic
  const calculateTaxes = () => {
    if (!income || isNaN(income) || parseFloat(income) <= 0) {
      setError('Please enter a valid income.');
      return;
    }
    setError('');
    const totalIncome = parseFloat(income);
    const qDividends = parseFloat(qualifiedDividends) || 0;
    const ltGains = parseFloat(longTermGains) || 0;
    const itemizedDeduction =
      (parseFloat(medical) || 0) +
      (parseFloat(salt) || 0) +
      (parseFloat(mortgage) || 0) +
      (parseFloat(charity) || 0) +
      (parseFloat(business) || 0) +
      (parseFloat(studentLoanInterest) || 0) +
      (parseFloat(retirementContributions) || 0);
    const filing = filingStatuses.find(f => f.value === filingStatus);
    const standardDeduction = filing ? filing.standardDeduction : 13850;
    const deductionUsed = Math.max(standardDeduction, itemizedDeduction);
    setDeductionStrategy(itemizedDeduction > standardDeduction ? 'Itemized' : 'Standard');
    const ordinaryIncome = totalIncome - (qDividends + ltGains);
    const taxableOrdinaryIncome = Math.max(0, ordinaryIncome - deductionUsed);
    const federalTaxOrdinary = calculateTaxFromBrackets(taxableOrdinaryIncome, federalTaxBrackets);
    const preferentialIncome = qDividends + ltGains;
    const capitalGainsTax = calculateTaxFromBrackets(preferentialIncome, capitalGainsBrackets);
    const totalFederalTax = federalTaxOrdinary + capitalGainsTax;
    let stateTax = 0;
    if (state === 'CA') {
      stateTax = calculateTaxFromBrackets(totalIncome, caTaxBrackets);
    } else {
      const rate = statesTaxRates[state] || 0;
      stateTax = totalIncome * rate;
    }
    let totalTax = totalFederalTax + stateTax;
    const credits =
      (parseFloat(childTaxCredit) || 0) +
      (parseFloat(eitc) || 0) +
      (parseFloat(educationCredit) || 0);
    totalTax = Math.max(0, totalTax - credits);
    setFederalTaxAmount(totalFederalTax);
    setStateTaxAmount(stateTax);
    setTotalTaxAmount(totalTax);
  };
  // Stepper navigation
  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleStep = (step) => setActiveStep(step);
  // Pie chart data
  const chartData = {
    labels: ['Federal Tax', 'State Tax', 'Credits', 'After-Tax Income'],
    datasets: [
      {
        data: [
          federalTaxAmount,
          stateTaxAmount,
          (parseFloat(childTaxCredit) || 0) + (parseFloat(eitc) || 0) + (parseFloat(educationCredit) || 0),
          Math.max(0, (parseFloat(income) || 0) - totalTaxAmount),
        ],
        backgroundColor: [
          '#243b55',
          '#FFD700',
          '#28a745',
          '#218838',
        ],
        borderWidth: 1,
      },
    ],
  };
  // UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e9ecef] py-8 px-2">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10 border border-primary/10">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex-1 flex flex-col items-center relative">
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-bold transition-all duration-200 ${
                  activeStep === idx
                    ? 'bg-primary text-white border-primary scale-110 shadow-lg'
                    : 'bg-white text-primary border-primary/30 hover:bg-primary/10'
                }`}
                onClick={() => handleStep(idx)}
                aria-label={step.label}
              >
                <span>{step.icon}</span>
              </button>
              <span className={`mt-2 text-xs font-medium ${activeStep === idx ? 'text-primary' : 'text-gray-500'}`}>{step.label}</span>
              {idx < steps.length - 1 && (
                <div className={`absolute top-5 right-0 w-full h-1 z-0 ${idx < activeStep ? 'bg-primary' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
        {/* Error */}
        {error && <div className="text-red-600 text-center mb-4 font-semibold">{error}</div>}
        {/* Step Content */}
        <form onSubmit={e => { e.preventDefault(); }}>
          {activeStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-1 font-semibold">Filing Status</label>
                <select
                  className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent"
                  value={filingStatus}
                  onChange={e => setFilingStatus(e.target.value)}
                >
                  {filingStatuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Total Income</label>
                <input
                  type="number"
                  className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent"
                  value={income}
                  onChange={e => setIncome(e.target.value)}
                  placeholder="Enter total income in dollars"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-semibold">Qualified Dividends</label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent"
                    value={qualifiedDividends}
                    onChange={e => setQualifiedDividends(e.target.value)}
                    placeholder="Enter qualified dividends"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-semibold">Long-Term Capital Gains</label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent"
                    value={longTermGains}
                    onChange={e => setLongTermGains(e.target.value)}
                    placeholder="Enter long-term capital gains"
                  />
                </div>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-2">Itemized Deductions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold">Medical Expenses</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={medical} onChange={e => setMedical(e.target.value)} placeholder="Medical expenses" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">State and Local Taxes (SALT)</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={salt} onChange={e => setSalt(e.target.value)} placeholder="SALT" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Mortgage Interest</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={mortgage} onChange={e => setMortgage(e.target.value)} placeholder="Mortgage interest" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Charitable Contributions</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={charity} onChange={e => setCharity(e.target.value)} placeholder="Charity" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Business Expenses</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={business} onChange={e => setBusiness(e.target.value)} placeholder="Business expenses" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Student Loan Interest</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={studentLoanInterest} onChange={e => setStudentLoanInterest(e.target.value)} placeholder="Student loan interest" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Retirement Contributions</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={retirementContributions} onChange={e => setRetirementContributions(e.target.value)} placeholder="Retirement contributions" />
                </div>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-2">Tax Credits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold">Child Tax Credit</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={childTaxCredit} onChange={e => setChildTaxCredit(e.target.value)} placeholder="Child tax credit" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Earned Income Tax Credit (EITC)</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={eitc} onChange={e => setEitc(e.target.value)} placeholder="EITC" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Education Credits</label>
                  <input type="number" className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent" value={educationCredit} onChange={e => setEducationCredit(e.target.value)} placeholder="Education credits" />
                </div>
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-1 font-semibold">State</label>
                <select
                  className="w-full rounded-xl border border-primary/20 px-4 py-3 bg-white focus:ring-2 focus:ring-accent"
                  value={state}
                  onChange={e => setState(e.target.value)}
                >
                  {Object.keys(statesTaxRates).map((stateCode) => (
                    <option key={stateCode} value={stateCode}>{stateCode}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {activeStep === 4 && (
            <div className="space-y-6">
              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-xs mb-6">
                  <Pie data={chartData} options={{
                    plugins: {
                      legend: { position: 'bottom', labels: { color: '#243b55', font: { size: 14 } } },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                  }} height={220} />
                </div>
                <div className="bg-white/90 rounded-2xl shadow-lg p-6 w-full max-w-md border border-primary/10">
                  <h3 className="text-lg font-bold mb-2 text-primary">Results</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span className="font-medium">Deduction Strategy:</span> <span>{deductionStrategy}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Federal Tax:</span> <span>${federalTaxAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="font-medium">State Tax ({state}):</span> <span>${stateTaxAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Total Tax Liability:</span> <span>${totalTaxAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="font-medium">After-Tax Income:</span> <span>${Math.max(0, (parseFloat(income) || 0) - totalTaxAmount).toFixed(2)}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            <button
              type="button"
              className="px-6 py-3 rounded-full font-bold bg-gray-200 text-primary hover:bg-primary hover:text-white transition disabled:opacity-50"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </button>
            {activeStep < steps.length - 1 && (
              <button
                type="button"
                className="px-6 py-3 rounded-full font-bold bg-primary text-white hover:bg-accent hover:text-primary transition"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {activeStep === steps.length - 2 && (
              <button
                type="button"
                className="px-6 py-3 rounded-full font-bold bg-accent text-primary hover:bg-primary hover:text-white transition"
                onClick={() => { calculateTaxes(); handleNext(); }}
              >
                Calculate
              </button>
            )}
            {activeStep === steps.length - 1 && (
              <button
                type="button"
                className="px-6 py-3 rounded-full font-bold bg-green-600 text-white hover:bg-green-700 transition"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}