import { db } from "../../../lib/firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";

// This function can be triggered by a Vercel Cron Job
export async function GET() {
  try {
    console.log("Cron job started: Fetching latest article from Firestore...");
    const articlesCollection = db.collection('articles');
    const snapshot = await articlesCollection.where('status', '==', 'pending').limit(1).get();

    if (snapshot.empty) {
      console.log("No new articles to generate posts from.");
      return new Response(JSON.stringify({ message: "No new articles to generate." }), { status: 200 });
    }

    const articleDoc = snapshot.docs[0];
    const articleRef = articleDoc.ref;
    const articleData = articleDoc.data();
    console.log("Found article to process:", articleDoc.id);

    await articleRef.update({ status: 'generating' });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      await articleRef.update({ status: 'pending' });
      console.error("Missing API key.");
      return new Response(JSON.stringify({ error: "Missing API key" }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a detailed blog post about "${articleData.title}". The blog post should be at least 500 words long and provide valuable insights for the reader.`;
    const result = await model.generateContent(prompt);
    const responseText = result?.response?.text?.()?.trim();

    if (!responseText) {
      await articleRef.update({ status: 'pending' });
      console.error("Failed to generate a valid response from AI.");
      return new Response(JSON.stringify({ error: "Failed to generate response from AI" }), { status: 500 });
    }

    const sanitizedTitle = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 100);

    const blogRef = db.collection("blogs").doc(sanitizedTitle);
    await blogRef.set({
      title: articleData.title,
      content: responseText,
      createdAt: new Date(),
    });

    await articleRef.update({ generated: true, status: 'completed' });
    console.log(`Successfully generated and saved blog post: ${sanitizedTitle}`);

    return new Response(JSON.stringify({ message: `Successfully generated post: ${sanitizedTitle}` }), { status: 200 });

  } catch (error) {
    console.error("Error in cron job:", error);
    // Attempt to revert status if an article was being processed
    if (articleRef) {
      await articleRef.update({ status: 'pending' }).catch(revertError => {
        console.error("Failed to revert article status:", revertError);
      });
    }
    return new Response(JSON.stringify({ error: "Failed to generate post" }), { status: 500 });
  }
}
