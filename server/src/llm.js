import OpenAI from "openai";
import { promptTemplate } from "./prompt.js";

const client = new OpenAI({
  apiKey: "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", // <-- nee OpenRouter key
  baseURL: "https://openrouter.ai/api/v1"
});

export async function summarizeText(text) {
  const prompt = promptTemplate.replace("{{USER_TEXT}}", text);

  const response = await client.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.2
  });

  const raw = response.choices[0].message.content;

  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error("Invalid JSON from model");
  }
}
