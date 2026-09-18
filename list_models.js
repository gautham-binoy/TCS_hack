const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
async function run() {
  console.log("Since GoogleGenerativeAI doesn't have listModels directly in JS SDK v0.1.0, we will try fetching directly from REST");
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.VITE_GEMINI_API_KEY}`);
  const data = await res.json();
  console.log(data.models.map(m => m.name));
}
run();
