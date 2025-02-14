import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // Parse the request JSON.
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
  lowerPrompt.includes("do you have a name") ||
  lowerPrompt.includes("introduce yourself") ||
  lowerPrompt.includes("what should i call you") ||

  lowerPrompt.includes("who made you") ||
  lowerPrompt.includes("who created you") ||
  lowerPrompt.includes("who developed you") ||
  lowerPrompt.includes("who built you") ||
  lowerPrompt.includes("who designed you") ||
  lowerPrompt.includes("who programmed you") ||
  lowerPrompt.includes("who invented you") ||
  lowerPrompt.includes("who coded you") ||
  lowerPrompt.includes("who trained you") ||

  lowerPrompt.includes("who owns you") ||
  lowerPrompt.includes("who is your creator") ||
  lowerPrompt.includes("who is your developer") ||
  lowerPrompt.includes("who is your owner") ||
  lowerPrompt.includes("who runs you") ||
  lowerPrompt.includes("who operates you") ||
  lowerPrompt.includes("who maintains you") ||

  lowerPrompt.includes("why were you created") ||
  lowerPrompt.includes("what is your purpose") ||
  lowerPrompt.includes("why do you exist") ||
  lowerPrompt.includes("what do you do") ||
  lowerPrompt.includes("why were you made") ||
  lowerPrompt.includes("what is your function") ||
  lowerPrompt.includes("what is your goal")
) {
  return new Response(
    JSON.stringify({ 
      text: "I am SmartTaxBot, an AI assistant developed by Mahboob Iqbal. My purpose is to help you with tax-related queries and financial information." 
    }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize the Google Generative AI client.
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Generate content based on the prompt.
    const result = await model.generateContent(prompt);

    // Return the result.
    return new Response(JSON.stringify({ text: result.response.text() }), {
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
