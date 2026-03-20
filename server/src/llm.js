import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.openai.com/v1",
});

export async function summarizeText(text) {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that summarizes text. Give summary, key points, and sentiment.",
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
      keyPoints: [
        "Auto-generated point 1",
        "Auto-generated point 2",
        "Auto-generated point 3",
      ],
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
