import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { summarizeText } from "./llm.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({
  path:path.join(__dirname, "../.env")
});

process.env.OPENAI_API_KEY = "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";

console.log("API KEY:",
process.env.OPENAI_API_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// MAIN API
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    // Validation
    if (!text || text.length < 20) {
      return res.status(400).json({
        error: "Text too short. Please enter at least 20 characters.",
      });
    }

    console.log("Incoming text:", text);

    const result = await summarizeText(text);

    console.log("AI RESULT:", result);

    res.json(result);
  } catch (error) {
    console.error("ERROR:", error.message);

    res.status(500).json({
      error: "Failed to summarize text.",
    });
  }
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});