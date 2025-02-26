// pages/api/set-password.js
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import bcrypt from 'bcrypt';

export const POST = async (req) => {
  try {
    const { token, password } = await req.json();
    const client = await clientPromise;
    const db = client.db();

    // Find the user with the matching token
    const user = await db.collection('users').findOne({ resetToken: token });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and remove the reset token
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword }, $unset: { resetToken: "" } }
    );

    return NextResponse.json({ message: 'Password set successfully' });
  } catch (error) {
    console.error('Set Password API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};
