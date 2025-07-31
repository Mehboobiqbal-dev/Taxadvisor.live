require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const apiKeys = process.env.GEMINI_API_KEYS.split(',');
let currentApiKeyIndex = 0;

const getApiKey = () => {
    const key = apiKeys[currentApiKeyIndex];
    currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
    return key;
};

const generatePost = async () => {
    try {
        const genAI = new GoogleGenerativeAI(getApiKey());
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Write a short blog post about a recent development in tax law.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        const fileName = `${new Date().toISOString().replace(/:/g, '-')}.md`;
        const filePath = path.join(__dirname, '../content', fileName);

        fs.writeFileSync(filePath, text);
        console.log(`Generated post: ${fileName}`);
    } catch (error) {
        console.error('Error generating post:', error);
        if (error.status === 429) {
            console.log('API key limit reached, trying next key.');
            generatePost();
        }
    }
};

cron.schedule('*/5 * * * *', () => {
    console.log('Generating new blog post...');
    generatePost();
});

console.log('Cron job scheduled to generate a new blog post every five minutes.');
