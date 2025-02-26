// app/success/page.jsx
'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Here you can fetch the session details from Stripe to get the user's email
    // Then, create a reset token and send an email to the user
    const finalizePayment = async () => {
      try {
        const res = await fetch('/api/finalize-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error finalizing payment:', error);
      }
    };

    finalizePayment();
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-2">Thank you for your purchase.</p>
      <p className="mb-2">We've sent an email to you with instructions to set up your password.</p>
      <p className="mt-4 text-sm text-gray-600">
        You will be redirected to the login page after setting your password.
      </p>
    </div>
  );
}
