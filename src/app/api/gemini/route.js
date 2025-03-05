import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // Parse the incoming request to extract the prompt
    const { prompt } = await request.json();
    if (!prompt) {
      console.error("No prompt provided in the request.");
      return new Response(
        JSON.stringify({ error: "Missing 'prompt' in the request body." }),
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
        JSON.stringify({ text: "I am SmartTaxBot, developed by Mehboob Iqbal." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Ensure the GEMINI_API_KEY environment variable is defined
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined in the environment variables.");
      return new Response(
        JSON.stringify({ error: "Internal server error: Missing API key." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize GoogleGenerativeAI with the API key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Call the AI model to generate content
    const result = await model.generateContent(prompt);
    const responseText = result?.response?.text?.();

    // Validate the result from the AI model
    if (!responseText) {
      console.error("Empty response received from GoogleGenerativeAI.");
      return new Response(
        JSON.stringify({ error: "Failed to generate a valid response from AI." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return the AI-generated response
    return new Response(
      JSON.stringify({ text: responseText }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Enhanced logging for debugging
    console.error("Error generating content:", error.message, error.stack);
    return new Response(
      JSON.stringify({
        error: "Internal server error. Check server logs for more details.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
