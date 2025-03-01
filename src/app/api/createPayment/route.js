import axios from 'axios';
import crypto from 'crypto';

export async function POST(request) {
  try {
    
    const { currency, amount } = await request.json();
  
    const amountUSD = amount || 10;

    
    const params = {
      version: '1',
      cmd: 'create_transaction',
      amount: amountUSD,
      currency1: 'USD',  
      currency2: currency,
      buyer_email: 'buyer@example.com', 
      key: process.env.COINPAYMENTS_PUBLIC_KEY,
      format: 'json',
    };

    
    const query = new URLSearchParams(params).toString();

    
    const hmac = crypto.createHmac('sha512', process.env.COINPAYMENTS_PRIVATE_KEY);
    hmac.update(query);
    const signature = hmac.digest('hex');

    
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

    
    if (data.error !== 'ok') {
      return new Response(JSON.stringify({ error: data.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

   
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
