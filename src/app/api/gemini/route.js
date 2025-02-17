import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // Parse the request JSON
    const { prompt } = await request.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing 'prompt'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check for specific prompts
    const lowerPrompt = prompt.toLowerCase();
    if (
      lowerPrompt.includes("what's your name") ||
      lowerPrompt.includes("what is your name") ||
      lowerPrompt.includes("who are you") ||
      lowerPrompt.includes("tell me your name") ||
      lowerPrompt.includes("introduce yourself") ||
      lowerPrompt.includes("who made you") ||
      lowerPrompt.includes("who created you") ||
      lowerPrompt.includes("what do you do") ||
      lowerPrompt.includes("what is your purpose")
    ) {
      return new Response(
        JSON.stringify({
          text: "I am SmartTaxBot, an AI assistant developed by Mahboob Iqbal. My purpose is to help you with tax-related queries and financial information.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    
    // ✅ Correct way to extract response
    const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

    // Return the response from the API
    return new Response(JSON.stringify({ text: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(JSON.stringify({ error: "Failed to generate content" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
