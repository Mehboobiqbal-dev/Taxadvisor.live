'use client';
import { useState } from 'react';

export default function Meeting() {
  const [meetingTime, setMeetingTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSchedule = async (e) => {
    e.preventDefault();
    // Here, you could call an API to save the meeting details in a database
    // or integrate with a scheduling tool like Calendly.
    setMessage(`Meeting scheduled at ${meetingTime}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Schedule Your Meeting</h1>
      <form onSubmit={handleSchedule} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label>Choose Meeting Time:</label>
          <input
            type="datetime-local"
            className="border p-2 w-full"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Schedule Meeting
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
