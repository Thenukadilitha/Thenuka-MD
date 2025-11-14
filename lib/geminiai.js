
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBITQxPo-dx8208OznOZFXJLgbZdRIdp2k;

async function askGemini(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (e) {
        console.log("Gemini Error:", e);
        return "⚠️ Error connecting to Gemini API.";
    }
}

module.exports = askGemini;
