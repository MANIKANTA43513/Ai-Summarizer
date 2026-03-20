import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://ai-summarizer-a4ucc7k3e-manikantas-projects-0870a117.vercel.app/",
    "X-Title": "AI Summarizer",
  },
});

export async function summarizeText(text) {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Summarize text, give key points and sentiment.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const output = response.choices[0].message.content;

    return {
      summary: output,
      keyPoints: ["Point 1", "Point 2", "Point 3"],
      sentiment: "positive",
    };
  } catch (error) {
    console.error("FULL ERROR:", error.message);

    return {
      summary: error.message,
      keyPoints: [],
      sentiment: "neutral",
    };
  }
}
