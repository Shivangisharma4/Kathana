import React, { useState } from "react";



export default function App() {
  const [theme, setTheme] = useState("");
  const [story, setStory] = useState("");
  const [mood, setMood] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStory("⏳ Generating your magical idea...");

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ theme, mood })
      });
      const data = await res.json();
      setStory(data.story);
    } catch (err) {
      setStory("⚠️ Failed to fetch story idea.");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* ⭐ Floating Stars Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-10 z-0 animate-pulse" />

      {/* ✨ Headline */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center tracking-wide z-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
          Kathana
        </span>{" "}
        – Your AI Story Muse ✨
      </h1>

      {/* 🎨 Input Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg z-10">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter your story theme..."
          className="w-full p-4 rounded-2xl bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 transition duration-300 shadow-md shadow-cyan-400/10"
        />
        <button
          type="submit"
          className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-cyan-500 font-semibold transition-all duration-300 shadow-lg shadow-cyan-400/20"
        >
          Generate Idea
        </button>
      </form>

      {/* 📝 Output */}
      {story && (
        <div className="mt-8 bg-gray-900/70 p-6 rounded-2xl shadow-xl backdrop-blur-md w-full max-w-2xl z-10">
          <h2 className="text-xl font-semibold mb-2 text-cyan-400">Story Idea:</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{story}</p>
        </div>
      )}
    </div>
  );
}
