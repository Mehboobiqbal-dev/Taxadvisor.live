import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import Stripe from 'stripe';
import bcrypt from 'bcrypt';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper function to generate a strong password
function generatePassword() {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

export async function POST(req) {
  try {
    const { sessionId } = await req.json();
    console.log('Received sessionId:', sessionId);

    if (!sessionId) {
      console.error('Session ID is missing.');
      return NextResponse.json(
        { error: 'Session ID is required.' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log('Stripe session retrieved:', session);
    } catch (err) {
      console.error('Error retrieving Stripe session:', err.message);
      return NextResponse.json(
        { error: 'Failed to retrieve payment session from Stripe.' },
        { status: 500 }
      );
    }

    const email = session.customer_email;
    console.log('Customer email:', email);

    if (!email) {
      console.error('Customer email not found in Stripe session.');
      return NextResponse.json(
        { error: 'Email not found in payment session.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    console.log('MongoDB client connected');
    const db = client.db();

    // Check if the user already exists
    let user;
    try {
      user = await db.collection('users').findOne({ email });
      console.log('User lookup result:', user);
    } catch (err) {
      console.error('Database query error:', err.message);
      return NextResponse.json(
        { error: 'Database error occurred.' },
        { status: 500 }
      );
    }

    if (!user) {
      // Generate a strong random password
      const generatedPassword = generatePassword();
      console.log('Generated password:', generatedPassword);

      // Hash the password
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // Create a new user entry
      user = { email, password: hashedPassword };

      try {
        await db.collection('users').insertOne(user);
        console.log('User inserted successfully');
      } catch (err) {
        console.error('Error inserting user into database:', err.message);
        return NextResponse.json(
          { error: 'Failed to create user in database.' },
          { status: 500 }
        );
      }

      // Return the generated password to the client
      return NextResponse.json(
        {
          message: 'Payment finalized',
          password: generatedPassword,
          email,
        },
        { status: 200 }
      );
    } else {
      // User already exists
      return NextResponse.json(
        {
          message: 'User already exists',
          email,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Finalize Payment API Error:', error.message);
    return NextResponse.json(
      { error: 'Server error occurred.' },
      { status: 500 }
    );
  }
}