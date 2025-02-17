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

    // Convert prompt to lowercase for comparison
    const lowerPrompt = prompt.toLowerCase();

    // Custom handling for specific prompts
    const predefinedPrompts = [
      "what's your name", "what is your name", "who are you", "tell me your name",
      "introduce yourself", "who made you", "who created you", "what do you do",
      "what is your purpose"
    ];

    if (predefinedPrompts.some(q => lowerPrompt.includes(q))) {
      prompt = `${prompt} (Answer as SmartTaxBot, an AI assistant developed by Mahboob Iqbal, focusing on tax-related queries and financial information.)`;
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content based on the modified prompt
    const result = await model.generateContent(prompt);

    // Extract response properly from API
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
