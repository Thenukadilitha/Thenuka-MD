const { cmd, commands } = require('../command');
const axios = require('axios');

// 👇 අලුතෙන් config file එක import කරන්න
const config = require('../config'); 

// 👇 කලින් තිබ්බ hardcoded token එක අයින් කරලා මේක දාන්න
const APIFY_TOKEN = config.APIFY_TOKEN; 

cmd({
    pattern: "fb",
// ... (ඉතුරු කෝඩ් එක ඒ විදියටම තියන්න)

cmd({
    pattern: "fb",
    alias: ["facebook", "fbdl"],
    desc: "Download Facebook videos using Apify",
    category: "download",
    react: "blue",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*කරුණාකර Facebook video link එකක් ලබා දෙන්න.* \nExample: .fb https://fb.watch/...");
        if (!q.includes('facebook.com') && !q.includes('fb.watch')) return reply("*මෙය වලංගු Facebook link එකක් නොවේ.*");

        // Downloading status එක පෙන්වීම
        await conn.sendMessage(from, { react: { text: "⬇️", key: mek.key } });
        reply("*Video එක Apify හරහා Download කරමින් පවතී. කරුණාකර රැඳී සිටින්න...*");

        // Apify Actor එක run කරලා data එක කෙලින්ම ලබා ගැනීම (Sync Run)
        // Actor ID: Ktp1rRNMlJgxmJ1Ic
        const apifyUrl = `https://api.apify.com/v2/acts/Ktp1rRNMlJgxmJ1Ic/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;
        
        const response = await axios.post(apifyUrl, {
            "startUrls": [{ "url": q }]
        });

        const data = response.data;

        if (data && data.length > 0) {
            const videoInfo = data[0];
            
            // Video URL එක තෝරාගැනීම (HD හෝ SD)
            const videoUrl = videoInfo.videoUrl || videoInfo.hdUrl || videoInfo.sdUrl;
            const caption = videoInfo.title || "Facebook Video";

            if (videoUrl) {
                // Video එක යැවීම
                await conn.sendMessage(from, { 
                    video: { url: videoUrl }, 
                    caption: `*🎥 FB DOWNLOADER (APIFY)*\n\n📌 *Title:* ${caption}\n\n🤖 *Bot:* Thenuka-MD`,
                    mimetype: "video/mp4"
                }, { quoted: mek });

                await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
            } else {
                reply("Apify එකෙන් Video URL එකක් සොයාගත නොහැකි විය. Privacy settings පරීක්ෂා කරන්න.");
            }
        } else {
            reply("Video එක සොයාගත නොහැක. Link එක නිවැරදි දැයි බලන්න.");
        }

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.response ? e.response.data.error.message : e.message}`);
    }
});
