const { GoogleGenerativeAI } = require("@google/generative-ai");

// Put your API key inside quotes " "
const genAI = new GoogleGenerativeAI("AIzaSyBITQxPo-dx8208OznOZFXJLgbZdRIdp2k");

async function askGemini(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        return "❌ Gemini Error: " + err.message;
    }
}

module.exports = askGemini;
