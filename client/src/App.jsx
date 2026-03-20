import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [sentiment, setSentiment] = useState("");

  const handleAnalyze = async () => {
    console.log("BUTTON CLICKED");

    try {
      const response = await fetch("https://ai-summarizer-oqlx.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      console.log("FRONTEND DATA:", data);

      setSummary(data.summary);
      setKeyPoints(data.keyPoints || []);
      setSentiment(data.sentiment);
    } catch (error) {
      console.error("FRONTEND ERROR:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Summarizer</h1>

      <textarea
        rows="6"
        cols="60"
        placeholder="Enter text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <br />
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