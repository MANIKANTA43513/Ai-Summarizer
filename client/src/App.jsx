import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    console.log("BUTTON CLICKED");

    try {
      const res = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      const data = await res.json();
      console.log("RESPONSE:", data);
      setResult(data);

    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Summarizer</h1>

      <textarea
        rows="5"
        cols="40"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAnalyze}>
        Analyze
      </button>

      <br /><br />

      {result && (
        <div>
          <h3>Summary:</h3>
          <p>{result.summary}</p>

          <h3>Key Points:</h3>
          <ul>
            {result.keyPoints?.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <h3>Sentiment:</h3>
          <p>{result.sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default App;