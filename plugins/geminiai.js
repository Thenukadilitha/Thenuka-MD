const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return response;

    } catch (error) {
        console.error("Gemini API Error:", error);
        return "⚠️ Gemini API Error.";
    }
}

module.exports = askGemini;
