const { cmd } = require('../command');
const askGemini = require('../lib/gemini');

function getMsgText(m) {
    return (
        m.text ||
        m.message?.conversation ||
        m.message?.extendedTextMessage?.text ||
        m.message?.imageMessage?.caption ||
        m.message?.videoMessage?.caption ||
        m.message?.buttonsResponseMessage?.selectedButtonId ||
        m.message?.listResponseMessage?.title ||
        ""
    );
}

cmd({
    pattern: "ai",
    desc: "Ask AI (Google Gemini)",
    category: "AI",
    react: "🤖",
    filename: __filename
},

async (conn, mek, m, { from }) => {

    const fullText = getMsgText(m);
    const text = fullText.split(" ").slice(1).join(" ");

    if (!text)
        return await conn.sendMessage(from, { 
            text: "💡 *Use:* .ai your question\n\nExample:\n`.ai What is a black hole?`" 
        });

    await conn.sendMessage(from, { text: "⏳ *AI thinking...*" });

    const reply = await askGemini(text);

    await conn.sendMessage(from, { text: reply }, { quoted: mek });
});
