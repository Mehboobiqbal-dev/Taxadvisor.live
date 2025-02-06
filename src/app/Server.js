// Import required libraries
import express from 'express';
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import { z } from 'zod';

// Set up Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Configure Genkit instance
const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // Default AI model
});

// Define a simple flow to generate tax advice (you can adjust this logic to your needs)
const taxAdvisorFlow = ai.defineFlow(
  {
    name: 'taxAdvisorFlow',
    inputSchema: z.object({
      country: z.string(),
      income: z.number(),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const { country, income } = input;
    const { text } = await ai.generate(`Provide tax advice for a person in ${country} with an income of ${income}`);
    return text;  // This is where the tax advice is generated and returned.
  }
);

// API route that the React frontend will hit
app.post('/api/flows/taxAdvisorFlow', async (req, res) => {
  try {
    const input = req.body;  // Get the request body
    const output = await taxAdvisorFlow(input);  // Generate the AI output
    res.json({ result: output });  // Send the AI output back to frontend
  } catch (error) {
    console.error('Error processing AI flow:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
