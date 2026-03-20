import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [sentiment, setSentiment] = useState("");

  const handleAnalyze = async () => {
    console.log("BUTTON CLICKED");

    try {
      const response = await fetch(
        "https://ai-summarizer-oqlx.onrender.com/api/summarize", // ✅ YOUR BACKEND
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputText,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        return;
      }

      const data = await response.json();
      console.log("RESPONSE:", data);

      setSummary(data.summary || "");
      setKeyPoints(data.keyPoints || []);
      setSentiment(data.sentiment || "");
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Summarizer</h1>

      <textarea
        rows="5"
        cols="50"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text here..."
      />

      <br /><br />
      <button onClick={handleAnalyze}>Analyze</button>

      <h2>Summary:</h2>
      <p>{summary}</p>

      <h2>Key Points:</h2>
      <ul>
        {keyPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <h2>Sentiment:</h2>
      <p>{sentiment}</p>
    </div>
  );
}

export default App;