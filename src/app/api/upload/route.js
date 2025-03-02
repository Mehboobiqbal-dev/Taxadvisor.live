// src/app/api/upload/route.js

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Configure your uploads directory
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure the upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

export const POST = async (request) => {
  try {
    await ensureUploadDir();

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a unique filename
    const timestamp = Date.now();
    const uniqueSuffix = `${timestamp}-${file.name}`;
    const filePath = path.join(uploadDir, uniqueSuffix);

    // Save the file
    await fs.writeFile(filePath, buffer);

    // Return the file URL
    const fileUrl = `/uploads/${uniqueSuffix}`;

    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
};
