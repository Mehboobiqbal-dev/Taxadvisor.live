// app/api/posts/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "posts.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const allPostsData = JSON.parse(fileContents);

    return NextResponse.json(allPostsData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}
