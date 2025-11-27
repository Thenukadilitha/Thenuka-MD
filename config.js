const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "FZlChDbL#J6a_qUf0VLQJIiu3k87Z3igz_z4KYtnCKQoDCuXtMzM",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "public",
AUTO_VOICE: process.env.AUTO_VOICE || "false",
AUTO_STICKER: process.env.AUTO_STICKER || "false",
AUTO_REPLY: process.env.AUTO_REPLY || "false",
ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/Thenukadilitha/Thenuka-bot/refs/heads/main/images/IMG-20251020-WA0002.jpg",
MENU_IMG: process.env.MENU_IMG || "https://raw.githubusercontent.com/Thenukadilitha/Thenuka-bot/refs/heads/main/images/IMG-20251020-WA0002.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "_Hi 💁🏽 How Can I Assist You. Am alive Now._",
ANTI_LINK: process.env.ANTI_LINK || "true",
ANTI_BAD: process.env.ANTI_BAD || "true",
PREFIX: process.env.PREFIX || ".",
FAKE_RECORDING: process.env.FAKE_RECORDING || "false",
FAKE_TYPING: process.env.FAKE_TYPING || "false",
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
CURRENT_STATUS: process.env.CURRENT_STATUS || "true",
AUTO_REACT: process.env.AUTO_REACT || "false",
HEART_REACT: process.env.HEART_REACT || "false",
OWNER_REACT: process.env.OWNER_REACT || "false",
BOT_NAME: process.env.BOT_NAME || "『Thenuka bot 』",
// 👇👇👇 මෙතන තමයි අලුත් පේළිය එකතු කරන්න ඕනේ 👇👇👇
APIFY_TOKEN: process.env.APIFY_TOKEN || "", // <-- NEW LINE HERE (ඔබගේ Apify Token එක මෙහි දමන්න)
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};
