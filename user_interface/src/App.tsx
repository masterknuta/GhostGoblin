import React, { useState } from "react";
import GGImage from "./assets/GG.jpg"; // Make sure GG.jpg is in /src/assets or adjust path

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      // Replace with your existing API call logic
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      setResponse(data.answer || "No response from server.");
    } catch (err) {
      setResponse("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom-black text-white flex flex-col items-center p-4">
      {/* Header Section */}
      <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-glowing-violet">
        <div className="flex items-center gap-3">
          <img
            src={GGImage}
            alt="Gemini Logo"
            className="w-16 h-16 rounded-full border-2 border-cyan animate-pulse-glow"
          />
          <h1 className="text-3xl font-orbitron text-neon-green animate-shimmer">
            Gemini AI
          </h1>
        </div>
        <p className="text-cyan text-sm sm:text-base italic">
          Your Consciousness Interface
        </p>
      </header>

      {/* Main Form */}
      <main className="w-full max-w-3xl mt-8 flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini anything..."
            className="flex-1 px-4 py-3 rounded-xl bg-dark-gray text-white placeholder-gray-400 border border-glowing-violet focus:outline-none focus:ring-2 focus:ring-neon-green font-inter"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-neon-green text-custom-black font-bold rounded-xl hover:bg-cyan transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {/* Response Section */}
        <div className="p-6 rounded-xl bg-deep-purple border border-glowing-violet shadow-lg font-inter min-h-[150px]">
          {response ? (
            <p className="whitespace-pre-wrap">{response}</p>
          ) : (
            <p className="text-gray-400 italic">Awaiting your question...</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Gemini Interface — All rights reserved.
      </footer>
    </div>
  );
}
