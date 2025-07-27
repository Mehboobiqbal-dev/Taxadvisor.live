import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// This function can be triggered by a Vercel Cron Job
export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing API key.");
      return new Response(JSON.stringify({ error: "Missing API key" }), {
        status: 500,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Write a short blog post about a recent development in tax law.";
    const result = await model.generateContent(prompt);
    const responseText = result?.response?.text?.().trim();

    if (!responseText) {
      console.error("Failed to generate a valid response from AI.");
      return new Response(
        JSON.stringify({ error: "Failed to generate response from AI" }),
        { status: 500 }
      );
    }

    const blogRef = collection(db, "blogs");
    await addDoc(blogRef, {
      title: "Recent Development in Tax Law",
      content: responseText,
      createdAt: new Date(),
    });

    console.log("Successfully generated and saved blog post.");

    return new Response(
      JSON.stringify({ message: "Successfully generated post" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in cron job:", error);
    return new Response(JSON.stringify({ error: "Failed to generate post" }), {
      status: 500,
    });
  }
}
