'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Progress } from '@/app/components/ui/progress';

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
  { label: 'Filing Status & Income' },
  { label: 'Deductions' },
  { label: 'Credits' },
  { label: 'State' },
  { label: 'Results' },
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
  const [formData, setFormData] = useState({
    filingStatus: 'single',
    income: '',
    qualifiedDividends: '',
    longTermGains: '',
    medical: '',
    salt: '',
    mortgage: '',
    charity: '',
    business: '',
    studentLoanInterest: '',
    retirementContributions: '',
    state: 'CA',
    childTaxCredit: '',
    eitc: '',
    educationCredit: '',
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Calculation logic
  const calculateTaxes = () => {
    if (!formData.income || isNaN(formData.income) || parseFloat(formData.income) <= 0) {
      setError('Please enter a valid income.');
      return;
    }
    setError('');
    const totalIncome = parseFloat(formData.income);
    const qDividends = parseFloat(formData.qualifiedDividends) || 0;
    const ltGains = parseFloat(formData.longTermGains) || 0;
    const itemizedDeduction =
      (parseFloat(formData.medical) || 0) +
      (parseFloat(formData.salt) || 0) +
      (parseFloat(formData.mortgage) || 0) +
      (parseFloat(formData.charity) || 0) +
      (parseFloat(formData.business) || 0) +
      (parseFloat(formData.studentLoanInterest) || 0) +
      (parseFloat(formData.retirementContributions) || 0);
    const filing = filingStatuses.find(f => f.value === formData.filingStatus);
    const standardDeduction = filing ? filing.standardDeduction : 13850;
    const deductionUsed = Math.max(standardDeduction, itemizedDeduction);
    const deductionStrategy = itemizedDeduction > standardDeduction ? 'Itemized' : 'Standard';
    const ordinaryIncome = totalIncome - (qDividends + ltGains);
    const taxableOrdinaryIncome = Math.max(0, ordinaryIncome - deductionUsed);
    const federalTaxOrdinary = calculateTaxFromBrackets(taxableOrdinaryIncome, federalTaxBrackets);
    const preferentialIncome = qDividends + ltGains;
    const capitalGainsTax = calculateTaxFromBrackets(preferentialIncome, capitalGainsBrackets);
    const totalFederalTax = federalTaxOrdinary + capitalGainsTax;
    let stateTax = 0;
    if (formData.state === 'CA') {
      stateTax = calculateTaxFromBrackets(totalIncome, caTaxBrackets);
    } else {
      const rate = statesTaxRates[formData.state] || 0;
      stateTax = totalIncome * rate;
    }
    let totalTax = totalFederalTax + stateTax;
    const credits =
      (parseFloat(formData.childTaxCredit) || 0) +
      (parseFloat(formData.eitc) || 0) +
      (parseFloat(formData.educationCredit) || 0);
    totalTax = Math.max(0, totalTax - credits);
    setResults({
      federalTaxAmount: totalFederalTax,
      stateTaxAmount: stateTax,
      totalTaxAmount: totalTax,
      deductionStrategy,
      afterTaxIncome: Math.max(0, totalIncome - totalTax),
    });
  };
  // Stepper navigation
  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // Pie chart data
  const chartData = {
    labels: ['Federal Tax', 'State Tax', 'After-Tax Income'],
    datasets: [
      {
        data: [
          results?.federalTaxAmount || 0,
          results?.stateTaxAmount || 0,
          results?.afterTaxIncome || 0,
        ],
        backgroundColor: [
          '#ef4444',
          '#f97316',
          '#22c55e',
        ],
        borderWidth: 1,
      },
    ],
  };
  // UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 py-12 px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Tax Calculator</CardTitle>
          <Progress value={(activeStep + 1) / steps.length * 100} className="mt-4" />
          <div className="flex justify-between mt-2">
            {steps.map((step, idx) => (
              <div key={step.label} className={`text-xs ${activeStep >= idx ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                {step.label}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={e => { e.preventDefault(); }}>
            {activeStep === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Filing Status</label>
                  <Select onValueChange={(value) => handleSelectChange('filingStatus', value)} defaultValue={formData.filingStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a filing status" />
                    </SelectTrigger>
                    <SelectContent>
                      {filingStatuses.map(status => (
                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Total Income</label>
                  <Input type="number" name="income" value={formData.income} onChange={handleInputChange} placeholder="Enter total income" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">Qualified Dividends</label>
                    <Input type="number" name="qualifiedDividends" value={formData.qualifiedDividends} onChange={handleInputChange} placeholder="Enter qualified dividends" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Long-Term Capital Gains</label>
                    <Input type="number" name="longTermGains" value={formData.longTermGains} onChange={handleInputChange} placeholder="Enter long-term capital gains" />
                  </div>
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Itemized Deductions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">Medical Expenses</label>
                    <Input type="number" name="medical" value={formData.medical} onChange={handleInputChange} placeholder="Medical expenses" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">State and Local Taxes (SALT)</label>
                    <Input type="number" name="salt" value={formData.salt} onChange={handleInputChange} placeholder="SALT" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Mortgage Interest</label>
                    <Input type="number" name="mortgage" value={formData.mortgage} onChange={handleInputChange} placeholder="Mortgage interest" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Charitable Contributions</label>
                    <Input type="number" name="charity" value={formData.charity} onChange={handleInputChange} placeholder="Charity" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Business Expenses</label>
                    <Input type="number" name="business" value={formData.business} onChange={handleInputChange} placeholder="Business expenses" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Student Loan Interest</label>
                    <Input type="number" name="studentLoanInterest" value={formData.studentLoanInterest} onChange={handleInputChange} placeholder="Student loan interest" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Retirement Contributions</label>
                    <Input type="number" name="retirementContributions" value={formData.retirementContributions} onChange={handleInputChange} placeholder="Retirement contributions" />
                  </div>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Tax Credits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">Child Tax Credit</label>
                    <Input type="number" name="childTaxCredit" value={formData.childTaxCredit} onChange={handleInputChange} placeholder="Child tax credit" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Earned Income Tax Credit (EITC)</label>
                    <Input type="number" name="eitc" value={formData.eitc} onChange={handleInputChange} placeholder="EITC" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Education Credits</label>
                    <Input type="number" name="educationCredit" value={formData.educationCredit} onChange={handleInputChange} placeholder="Education credits" />
                  </div>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">State</h2>
                <Select onValueChange={(value) => handleSelectChange('state', value)} defaultValue={formData.state}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statesTaxRates).map((stateCode) => (
                      <SelectItem key={stateCode} value={stateCode}>{stateCode}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {activeStep === 4 && (
              <div className="space-y-6 text-center">
                {results && (
                  <>
                    <div className="w-full max-w-xs mx-auto">
                      <Pie data={chartData} options={{
                        plugins: {
                          legend: { position: 'bottom' },
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                      }} height={250} />
                    </div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Tax Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between"><span>Deduction Strategy:</span> <span className="font-medium">{results.deductionStrategy}</span></div>
                        <div className="flex justify-between"><span>Federal Tax:</span> <span className="font-medium">${results.federalTaxAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>State Tax ({formData.state}):</span> <span className="font-medium">${results.stateTaxAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between text-lg font-bold"><span>Total Tax Liability:</span> <span>${results.totalTaxAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between text-lg font-bold"><span>After-Tax Income:</span> <span>${results.afterTaxIncome.toFixed(2)}</span></div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            )}
            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={handleBack} disabled={activeStep === 0}>
                Back
              </Button>
              {activeStep < steps.length - 1 && (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 2 && (
                <Button type="button" onClick={() => { calculateTaxes(); handleNext(); }}>
                  Calculate
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button type="button" variant="secondary" onClick={() => { setActiveStep(0); setResults(null); }}>
                  Reset
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
