const { cmd } = require('../command');
const askGemini = require('../lib/gemini');

cmd({
    pattern: "ai",
    desc: "Ask Google Gemini AI",
    category: "AI",
    react: "🤖",
    filename: __filename
},

async (conn, mek, m, { from }) => {
    const text = m.text.split(" ").slice(1).join(" ");

    if (!text)
        return await conn.sendMessage(from, { text: "💡 *Use:* .gemini your question\n\nExample:\n`.gemini Explain black holes`" });

    await conn.sendMessage(from, { text: "⏳ *Gemini thinking...*" });

    const reply = await askGemini(text);

    await conn.sendMessage(from, { text: reply }, { quoted: mek });
});
