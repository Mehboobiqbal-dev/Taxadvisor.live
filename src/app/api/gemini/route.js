import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Missing 'prompt'" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle some fixed responses for common questions
    const lowerPrompt = prompt.toLowerCase();
    if (
      lowerPrompt.includes("what's your name") ||
      lowerPrompt.includes("what is your name") ||
      lowerPrompt.includes("who made you") ||
      lowerPrompt.includes("who created you") ||
      lowerPrompt.includes("who developed you")
    ) {
      return new Response(
        JSON.stringify({ text: "I am TaxGPT, developed by Mehboob Iqbal." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize GoogleGenerativeAI with your secure API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    return new Response(
      JSON.stringify({ text: result.response.text() }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate content" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
