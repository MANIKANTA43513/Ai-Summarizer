import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeText(text) {
  if (!text || text.length < 20) {
    throw new Error("Text too short");
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Give:
1. Summary
2. Key Points
3. Sentiment

Text:
${text}`,
        },
      ],
    });

    const output = completion.choices[0].message.content;

    return {
      summary: output,
      keyPoints: ["Generated from AI"],
      sentiment: "positive",
    };
  } catch (error) {
    console.error("OPENAI ERROR:", error.message);
    throw new Error("failed to summarize text");
  }
}