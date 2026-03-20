import fetch from "node-fetch";

export async function summarizeText(text) {
  try {
    const response = await fetch(
      `${process.env.OPENAI_BASE_URL}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Analyze the following text and respond ONLY in JSON.

Rules:
- summary: 2-3 lines
- keyPoints: EXACTLY 3 bullet points (strictly 3, not less, not more)
- sentiment: one word (positive/neutral/negative)

Format:
{
  "summary": "...",
  "keyPoints": ["point1", "point2", "point3"],
  "sentiment": "positive"
}

Text:
${text}`
            }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();
    console.log("FULL RESPONSE:", data);

    let content = data?.choices?.[0]?.message?.content || "{}";

    let parsed;

    try {
      parsed = JSON.parse(content);

      // ✅ Ensure keyPoints is array
      if (!parsed.keyPoints || !Array.isArray(parsed.keyPoints)) {
        parsed.keyPoints = [];
      }

      // ✅ Ensure exactly 3 points
      while (parsed.keyPoints.length < 3) {
        parsed.keyPoints.push("Additional insight not generated");
      }

    } catch (err) {
      console.log("JSON parse failed");

      parsed = {
        summary: content,
        keyPoints: [],
        sentiment: "neutral"
      };
    }

    return {
      summary: parsed.summary || "No summary",
      keyPoints: parsed.keyPoints || [],
      sentiment: parsed.sentiment || "neutral"
    };

  } catch (error) {
    console.error("ERROR:", error.message);

    return {
      summary: "Error generating summary",
      keyPoints: [],
      sentiment: "neutral"
    };
  }
}