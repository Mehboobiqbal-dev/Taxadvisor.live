
import express from 'express';
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';
import { z } from 'zod';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, 
});

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
    return text; 
  }
);


app.post('/api/flows/taxAdvisorFlow', async (req, res) => {
  try {
    const input = req.body;  
    const output = await taxAdvisorFlow(input);  
    res.json({ result: output }); 
  } catch (error) {
    console.error('Error processing AI flow:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
