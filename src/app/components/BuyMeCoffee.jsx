"use client";
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function BuyMeCoffee() {
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currency, setCurrency] = useState('BTC'); // Default selected cryptocurrency
  const [amount, setAmount] = useState(10); // Default payment amount in USD

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

  useEffect(() => {
    const timeIntervals = [15000, 60000, 120000]; // 15s, 1m, and 2m intervals
    let currentIntervalIndex = 0;

    const showModalSequence = () => {
      if (currentIntervalIndex < timeIntervals.length) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          currentIntervalIndex++;
          setTimeout(showModalSequence, timeIntervals[currentIntervalIndex]);
        }, 15000); // Modal shows for 15 seconds
      }
    };

    setTimeout(showModalSequence, timeIntervals[currentIntervalIndex]);

    return () => clearTimeout(showModalSequence); // Clean up the timeout on component unmount
  }, []);

  return (
    <>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Buy Me a Coffee ☕</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container my-5">
            <div className="card mx-auto" style={{ maxWidth: '500px' }}>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Amount in USD</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Cryptocurrency</label>
                  <select
                    className="form-select"
                    onChange={(e) => setCurrency(e.target.value)}
                    value={currency}
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="LTC">Litecoin (LTC)</option>
                    <option value="USDT">Tether (USDT)</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {paymentDetails && (
            <div>
              <p>
                Send <strong>{paymentDetails.amount} {currency}</strong> to:
              </p>
              <p className="fw-bold">{paymentDetails.address}</p>
              <p>Confirmations Needed: {paymentDetails.confirms_needed}</p>
              <p>Payment Timeout: {paymentDetails.timeout} minutes</p>
                          </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


