// components/BuyMeCoffee.jsx
"use client";
import React, { useState } from 'react';
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
        setShowModal(true); // Open the modal when payment details are available
      } else {
        alert('Payment creation failed: ' + data.error);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-header text-center">
          <h3>Buy Me a Coffee ☕</h3>
          <p>Support me with your donation</p>
        </div>
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

      {/* Bootstrap Modal for Payment Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {paymentDetails && (
            <div>
              <p>
                Send <strong>{paymentDetails.amount} {currency}</strong> to:
              </p>
              <p className="fw-bold">{paymentDetails.address}</p>
              <p>Confirmations Needed: {paymentDetails.confirms_needed}</p>
              <p>Payment Timeout: {paymentDetails.timeout} minutes</p>
              {/* Optionally, include a QR code here using a QR code library */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


