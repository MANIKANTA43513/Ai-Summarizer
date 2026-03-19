import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { summarizeText } from "./llm.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Route
app.post("/api/summarize", async (req, res) => {
  try {
    const text = req.body?.text?.trim();

    // Validation
    if (!text) {
      return res.status(400).json({ error: "Input text is required." });
    }

    if (text.length < 10) {
      return res.status(400).json({ error: "Text too short." });
    }

    // LLM call
    const result = await summarizeText(text);

    return res.json(result);

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      error: "Failed to summarize text."
    });
  }
});

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});