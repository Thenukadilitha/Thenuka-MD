const { cmd, commands } = require("../command");
const getFbVideoInfo = require("@xaviabot/fb-downloader");

cmd(
  {
    pattern: "fb",
    alias: ["facebook", "fbdownload"],
    react: "✅",
    desc: "Download Facebook Video",
    category: "download",
    filename: __filename,
  },
  async (
    thenuka,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a valid Facebook video URL!* ❤️");

      const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
      if (!fbRegex.test(q))
        return reply("*Invalid Facebook URL! Please check and try again.* ☹️");

      reply("*Downloading your video...* ❤️");

      const result = await getFbVideoInfo(q);
      if (!result || (!result.sd && !result.hd)) {
        return reply("*Failed to download video. Please try again later.* ☹️");
      }

      const { title, sd, hd } = result;
      const bestQualityUrl = hd || sd;
      const qualityText = hd ? "HD" : "SD";

      const desc = `
Your fb video
👻 *Title*: ${title || "Unknown"}
👻 *Quality*: ${qualityText}
`;

      await thenuka.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/Thenukadilitha/Thenuka-bot/blob/main/Images/IMG-20251020-WA0002.jpg?raw=true",
          },
          caption: desc,
        },
        { quoted: mek }
      );

      await thenuka.sendMessage(
        from,
        {
          video: { url: bestQualityUrl },
          caption: `*📥 Downloaded in ${qualityText} quality*`,
        },
        { quoted: mek }
      );

      return reply("Thank you for using thenuka bot");
    } catch (e) {
      console.error(e);
      reply(`*Error:* ${e.message || e}`);
    }
  }
);
