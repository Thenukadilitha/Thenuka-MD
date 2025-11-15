const { cmd } = require('../command');
const askGemini = require('../lib/gemini');

cmd({
    pattern: "ai",
    desc: "Ask AI (Google Gemini)",
    category: "AI",
    react: "🤖",
    filename: __filename
},

async (conn, mek, m, { from }) => {

    // SAFE text loader (fix for undefined .split)
    const userText =
        m.text ||
        m.caption ||
        m.message?.conversation ||
        m.buttonReply?.selectedDisplayText ||
        m.templateReply?.hydratedTemplate?.hydratedContentText ||
        m.listResponse?.singleSelectReply?.selectedRowId ||
        m.extendedTextMessage?.text ||
        "";

    const text = userText.split(" ").slice(1).join(" ");

    if (!text)
        return await conn.sendMessage(from, { 
            text: "💡 *Use:* .ai your question\n\nExample:\n`.ai What is a black hole?`" 
        });

    await conn.sendMessage(from, { text: "⏳ *AI thinking...*" });

    const reply = await askGemini(text);

    await conn.sendMessage(from, { text: reply }, { quoted: mek });
});
