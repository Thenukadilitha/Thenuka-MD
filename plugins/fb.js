const axios = require('axios');

async function facebookCommand(sock, chatId, message) {
    try {
        // Get message text
        const body =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            message.message?.imageMessage?.caption ||
            "";

        const url = body.split(" ").slice(1).join(" ").trim();

        if (!url) {
            return await sock.sendMessage(chatId, {
                text: "⚠️ Please provide a Facebook video URL.\nExample: .fb https://www.facebook.com/..."
            }, { quoted: message });
        }

        if (!url.includes("facebook.com")) {
            return await sock.sendMessage(chatId, {
                text: "❌ That is not a Facebook link."
            }, { quoted: message });
        }

        // React to show loading
        await sock.sendMessage(chatId, {
            react: { text: "🔄", key: message.key }
        });

        // Call Siputzx API
        const api = `https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(url)}`;
        const res = await axios.get(api, {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 15000
        });

        const data = res.data;

        if (!data || !data.status || !Array.isArray(data.data)) {
            return await sock.sendMessage(chatId, {
                text: "❌ Failed to fetch video. API might be down or link is private."
            }, { quoted: message });
        }

        // Select HD first, fallback to SD
        const hd = data.data.find(v => v.quality?.toUpperCase() === "HD");
        const sd = data.data.find(v => v.quality?.toUpperCase() === "SD");

        const videoUrl = hd?.url || sd?.url;

        if (!videoUrl) {
            return await sock.sendMessage(chatId, {
                text: "❌ No downloadable video found."
            }, { quoted: message });
        }

        const caption = `📥 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗩𝗶𝗱𝗲𝗼\n\n📝 Title: ${data.title || "Unknown"}`;

        // Send video by URL
        await sock.sendMessage(chatId, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: caption
        }, { quoted: message });

    } catch (e) {
        console.error("FB Command Error:", e);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error occurred: " + e.message
        }, { quoted: message });
    }
}

// Register command
cmd({
    pattern: "fb",
    alias: ["facebook", "fbdownload"],
}, facebookCommand);

module.exports = facebookCommand;
