import axios from 'axios';
import crypto from 'crypto';

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const { currency, amount } = await request.json();
    // Use the provided amount or default to 10 if not provided
    const amountUSD = amount || 10;

    // Prepare parameters for the CoinPayments API (note the added version parameter)
    const params = {
      version: '1', // Specify API version
      cmd: 'create_transaction',
      amount: amountUSD,
      currency1: 'USD',  // Price is specified in USD
      currency2: currency,
      buyer_email: 'buyer@example.com', // Optional: replace if needed
      key: process.env.COINPAYMENTS_PUBLIC_KEY,
      format: 'json',
    };

    // Convert parameters to a URL-encoded query string
    const query = new URLSearchParams(params).toString();

    // Generate HMAC signature using your private key
    const hmac = crypto.createHmac('sha512', process.env.COINPAYMENTS_PRIVATE_KEY);
    hmac.update(query);
    const signature = hmac.digest('hex');

    // Post the request to CoinPayments API
    const response = await axios.post(
      'https://www.coinpayments.net/api.php',
      query,
      {
        headers: {
          'HMAC': signature,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const data = response.data;

    // Check for errors from CoinPayments
    if (data.error !== 'ok') {
      return new Response(JSON.stringify({ error: data.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return the transaction details as JSON
    return new Response(JSON.stringify(data.result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in /api/createPayment:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
