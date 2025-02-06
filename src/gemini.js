import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY; // Ensure your .env.local contains this

const genAI = new GoogleGenerativeAI(apiKey);

export default async function gemini(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text(); // Extracts AI's response
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "AI could not generate a response.";
    }
}
