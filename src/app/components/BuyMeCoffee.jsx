"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Coffee } from 'lucide-react';

export function BuyMeCoffee() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [currency, setCurrency] = useState('BTC'); // Default selected cryptocurrency
  const [amount, setAmount] = useState(10); // Default payment amount in USD

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setPaymentDetails(null);

    try {
      const res = await fetch('/api/createPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency, amount }),
      });
      const data = await res.json();
      if (data.address) {
        setPaymentDetails(data);
      } else {
        alert('Payment creation failed: ' + data.error);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
            size="icon"
            onClick={() => setIsOpen(true)}
          >
            <Coffee className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Buy Me a Coffee ☕</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right">
                Amount (USD)
              </label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="currency" className="text-right">
                Currency
              </label>
              <Select onValueChange={setCurrency} defaultValue={currency}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
                  <SelectItem value="USDT">Tether (USDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>
          {paymentDetails && (
            <div className="mt-4 text-sm">
              <p>
                Send <strong>{paymentDetails.amount} {currency}</strong> to:
              </p>
              <p className="font-mono bg-muted p-2 rounded-md">{paymentDetails.address}</p>
              <p>Confirmations Needed: {paymentDetails.confirms_needed}</p>
              <p>Payment Timeout: {paymentDetails.timeout} minutes</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
