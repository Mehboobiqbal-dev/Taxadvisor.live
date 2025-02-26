'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const finalizePayment = async () => {
      try {
        if (!sessionId) {
          setErrorMessage('Session ID is missing.');
          return;
        }

        const res = await fetch('/api/finalize-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        if (!res.ok) {
          // Handle HTTP errors
          const errorData = await res.json().catch(() => null);
          const errorText = errorData?.error || 'Server error occurred.';
          console.error('Server error:', errorText);
          setErrorMessage(errorText);
          return;
        }

        const data = await res.json();

        if (data.password && data.email) {
          setPassword(data.password);
          setEmail(data.email);
        } else {
          console.error('Invalid response data:', data);
          setErrorMessage('Failed to retrieve account details.');
        }
      } catch (error) {
        console.error('Error finalizing payment:', error);
        setErrorMessage('Network error occurred.');
      }
    };

    finalizePayment();
  }, [sessionId]);

  const handleRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : password && email ? (
        <>
          <p className="mb-2">Thank you for your purchase.</p>
          <p className="mb-2">Your login credentials are:</p>
          <div className="bg-white p-4 rounded shadow mb-4">
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Password:</strong> {password}
            </p>
          </div>
          <p className="mb-4 text-sm text-red-600">
            Please save these credentials securely. They will not be displayed again.
          </p>
          <button
            onClick={handleRedirect}
            className="bg-green-500 text-white p-2 rounded"
          >
            Go to Login
          </button>
        </>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Processing your account...</p>
      )}
    </div>
  );
}
