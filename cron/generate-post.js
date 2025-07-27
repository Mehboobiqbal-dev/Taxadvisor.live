require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { db } = require("../src/app/lib/firebase");
const fs = require('fs');
const path = require('path');
const util = require('util');

const logFilePath = path.join(__dirname, 'cron_debug.log');
const log_file = fs.createWriteStream(logFilePath, { flags: 'w' });

const log = (level, ...args) => {
    const message = util.format(...args);
    const timestamp = new Date().toISOString();
    log_file.write(`[${timestamp}] [${level.toUpperCase()}] ${message}\n`);
};

console.log = (...args) => log('log', ...args);
console.warn = (...args) => log('warn', ...args);
console.error = (...args) => log('error', ...args);

const lockFilePath = path.join(__dirname, 'generate-post.lock');

async function generatePost() {
    console.log("Starting post generation...");
    if (fs.existsSync(lockFilePath)) {
        const stats = fs.statSync(lockFilePath);
        const now = new Date().getTime();
        const lockFileAge = (now - stats.mtime.getTime()) / 1000;
        if (lockFileAge > 300) {
            fs.unlinkSync(lockFilePath);
        } else {
            console.log('Lock file exists and is recent, another process is likely running.');
            return;
        }
    }

    fs.writeFileSync(lockFilePath, process.pid.toString());

    let articleRef;
    try {
        console.log("Fetching latest article from Firestore...");
        const articlesCollection = db.collection('articles');
        const snapshot = await articlesCollection.where('status', '==', 'pending').limit(1).get();

        if (snapshot.empty) {
            console.log("No new articles to generate posts from.");
            return;
        }

        const articleDoc = snapshot.docs[0];
        articleRef = articleDoc.ref;
        const articleData = articleDoc.data();
        console.log("Found article to process:", articleDoc.id);

        await articleRef.update({ status: 'generating' });

        try {
            if (!articleData.link || !articleData.published || !articleData.source) {
                console.warn("Skipping article with missing required fields:", articleDoc.id);
                await articleRef.update({ generated: true, status: 'completed' });
                console.log("Article skipped and marked as completed.");
                return;
            }

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
                await articleRef.update({ status: 'pending' });
                console.error("Missing API key.");
                return;
            }
            console.log("API key found.");

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Write a detailed blog post about "${articleData.title}". The blog post should be at least 500 words long and provide valuable insights for the reader.`;
            console.log("Generating content with prompt:", prompt);

            const result = await model.generateContent(prompt);
            const responseText = result?.response?.text?.()?.trim();

            if (!responseText) {
                await articleRef.update({ status: 'pending' });
                console.error("Failed to generate a valid response from AI.");
                return;
            }
            console.log("Successfully generated content from AI.");

            const sanitizedTitle = articleData.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .slice(0, 100);
            console.log("Sanitized title:", sanitizedTitle);

            console.log("Saving blog post to Firebase...");
            const blogRef = db.collection("blogs").doc(sanitizedTitle);
            await blogRef.set({
                title: articleData.title,
                content: responseText,
                createdAt: new Date(),
            });
            console.log("Blog post saved to Firebase.");

            console.log("Updating article status in Firestore...");
            await articleRef.update({ generated: true, status: 'completed' });
            console.log("Article status updated in Firestore.");

            console.log(`Successfully generated and saved blog post: ${sanitizedTitle}`);
        } catch (error) {
            console.error("Error during post generation logic:", error);
            if (articleRef) {
                console.log("Reverting article status to 'pending'.");
                await articleRef.update({ status: 'pending' });
            }
        }
    } catch (error) {
        console.error("Top-level error in generatePost:", error);
    } finally {
        if (fs.existsSync(lockFilePath)) {
            fs.unlinkSync(lockFilePath);
        }
        console.log("Post generation script finished.");
    }
}

generatePost().then(() => {
    log_file.end(() => {
        process.exit(0);
    });
}).catch(err => {
    console.error("Unhandled error in generatePost:", err);
    log_file.end(() => {
        process.exit(1);
    });
});
