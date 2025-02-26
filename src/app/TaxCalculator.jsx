'use client';
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Stack,
  Box,
  Card,
} from '@mui/material';
import styles from '@/app/TaxCalculator.module.css';

// 2024 Federal tax brackets (single filer) for ordinary income
const federalTaxBrackets = [
  { min: 0, max: 9950, rate: 0.10 },
  { min: 9950, max: 40525, rate: 0.12 },
  { min: 40525, max: 86375, rate: 0.22 },
  { min: 86375, max: 164925, rate: 0.24 },
  { min: 164925, max: 209425, rate: 0.32 },
  { min: 209425, max: 523600, rate: 0.35 },
  { min: 523600, max: Infinity, rate: 0.37 },
];

// 2024 Capital gains brackets (for qualified dividends and long-term gains)
const capitalGainsBrackets = [
  { min: 0, max: 44725, rate: 0.00 },
  { min: 44725, max: 492300, rate: 0.15 },
  { min: 492300, max: Infinity, rate: 0.20 },
];

// Flat state tax rates for most states (approximation for 2024)
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

// California progressive tax brackets for 2024
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

// Helper function to calculate tax based on progressive brackets
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

const TaxCalculator = () => {
  // Input fields
  const [income, setIncome] = useState('');
  const [qualifiedDividends, setQualifiedDividends] = useState('');
  const [longTermGains, setLongTermGains] = useState('');
  const [medical, setMedical] = useState('');
  const [salt, setSalt] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [charity, setCharity] = useState('');
  const [business, setBusiness] = useState('');
  const [state, setState] = useState('CA');

  // Results and messages
  const [federalTaxAmount, setFederalTaxAmount] = useState(0);
  const [stateTaxAmount, setStateTaxAmount] = useState(0);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [deductionStrategy, setDeductionStrategy] = useState('Standard');
  const [error, setError] = useState('');

  // Calculate all taxes when the user clicks "Calculate Taxes"
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
      (parseFloat(business) || 0);

    const standardDeduction = 13850; // 2024 standard deduction for single filers
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

    const totalTax = totalFederalTax + stateTax;

    setFederalTaxAmount(totalFederalTax);
    setStateTaxAmount(stateTax);
    setTotalTaxAmount(totalTax);
  };

  // Save current inputs to localStorage
  const handleSave = () => {
    const taxInfo = {
      income,
      qualifiedDividends,
      longTermGains,
      medical,
      salt,
      mortgage,
      charity,
      business,
      state,
    };
    localStorage.setItem('taxInfo', JSON.stringify(taxInfo));
  };

  // Load saved inputs from localStorage
  const handleLoad = () => {
    const saved = localStorage.getItem('taxInfo');
    if (saved) {
      const taxInfo = JSON.parse(saved);
      setIncome(taxInfo.income);
      setQualifiedDividends(taxInfo.qualifiedDividends);
      setLongTermGains(taxInfo.longTermGains);
      setMedical(taxInfo.medical);
      setSalt(taxInfo.salt);
      setMortgage(taxInfo.mortgage);
      setCharity(taxInfo.charity);
      setBusiness(taxInfo.business);
      setState(taxInfo.state);
    }
  };

  // Reset all fields
  const handleReset = () => {
    setIncome('');
    setQualifiedDividends('');
    setLongTermGains('');
    setMedical('');
    setSalt('');
    setMortgage('');
    setCharity('');
    setBusiness('');
    setState('CA');
    setFederalTaxAmount(0);
    setStateTaxAmount(0);
    setTotalTaxAmount(0);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">Estimator for 2024-2025 Taxes</h1>
      <Card className="mt-4 p-6">
        <h2 className="text-xl font-semibold">Overview of Federal Income Taxes</h2>
        <p className="text-sm text-gray-600 mt-2">
          Income in America is taxed by the federal government, most state governments, and many local governments.
        </p>
      </Card>
      <Box className={styles.container} component="main" tabIndex={-1}>
        <Typography variant="h4" className={styles.heading} gutterBottom>
          2024 Tax Calculator
        </Typography>
        {error && (
          <Typography className={styles.error} aria-live="assertive" role="alert">
            {error}
          </Typography>
        )}
        <Stack spacing={2}>
          <TextField
            label="Total Income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            fullWidth
            className={styles.inputField}
            inputProps={{ 'aria-label': 'Enter total income in dollars' }}
          />
          <TextField
            label="Qualified Dividends"
            type="number"
            value={qualifiedDividends}
            onChange={(e) => setQualifiedDividends(e.target.value)}
            fullWidth
            className={styles.inputField}
            inputProps={{ 'aria-label': 'Enter qualified dividends amount' }}
          />
          <TextField
            label="Long-Term Capital Gains"
            type="number"
            value={longTermGains}
            onChange={(e) => setLongTermGains(e.target.value)}
            fullWidth
            className={styles.inputField}
            inputProps={{ 'aria-label': 'Enter long-term capital gains amount' }}
          />

          <Typography variant="h6" component="h2">
            Itemized Deductions
          </Typography>
          <TextField
            label="Medical Expenses"
            type="number"
            value={medical}
            onChange={(e) => setMedical(e.target.value)}
            fullWidth
            className={styles.inputField}
            inputProps={{ 'aria-label': 'Enter medical expenses' }}
          />
          <TextField
            label="State and Local Taxes (SALT)"
            type="number"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
            fullWidth
            className={styles.inputField}
            inputProps={{ 'aria-label': 'Enter state and local taxes' }}
          />
          <TextField
            label="Mortgage Interest"
            type="number"
            value={mortgage}
            onChange={(e) => setMortgage(e.target.value)}
            fullWidth
            className={styles.inputField}
            inputProps={{ 'aria-label': 'Enter mortgage interest amount' }}
          />
          <TextField
            label="Charitable Contributions"
            type="number"
            value={charity}
            onChange={(e) => setCharity(e.target.value)}
            fullWidth
            className={styles.inputField}
            inputProps={{ 'aria-label': 'Enter charitable contributions amount' }}
          />
          <TextField
            label="Business Expenses"
            type="number"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            fullWidth
            className={styles.inputField}
            inputProps={{ 'aria-label': 'Enter business expenses amount' }}
          />

          <FormControl fullWidth className={styles.inputField}>
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
              labelId="state-select-label"
              value={state}
              onChange={(e) => setState(e.target.value)}
              label="State"
            >
              {Object.keys(statesTaxRates).map((stateCode) => (
                <MenuItem key={stateCode} value={stateCode}>
                  {stateCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" className={styles.buttons} spacing={2}>
            <Button variant="contained" color="primary" onClick={calculateTaxes} aria-label="Calculate Taxes">
              Calculate Taxes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset} aria-label="Reset Form">
              Reset
            </Button>
            <Button variant="contained" color="success" onClick={handleSave} aria-label="Save Data">
              Save
            </Button>
            <Button variant="contained" color="info" onClick={handleLoad} aria-label="Load Saved Data">
              Load
            </Button>
          </Stack>

          {(federalTaxAmount > 0 || stateTaxAmount > 0) && (
            <Box className={styles.results} role="region" aria-labelledby="results-heading">
              <Typography variant="h6" id="results-heading">
                Results
              </Typography>
              <Typography>
                Deduction Strategy: {deductionStrategy} (Deduction used: $
                {Math.max(
                  13850,
                  (parseFloat(medical) || 0) +
                    (parseFloat(salt) || 0) +
                    (parseFloat(mortgage) || 0) +
                    (parseFloat(charity) || 0) +
                    (parseFloat(business) || 0)
                )}
                )
              </Typography>
              <Typography>Federal Tax: ${federalTaxAmount.toFixed(2)}</Typography>
              <Typography>State Tax ({state}): ${stateTaxAmount.toFixed(2)}</Typography>
              <Typography>Total Tax Liability: ${totalTaxAmount.toFixed(2)}</Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default TaxCalculator;