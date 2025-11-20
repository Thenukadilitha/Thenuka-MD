const { cmd, commands } = require("../command");
const axios = require("axios");

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
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a valid Facebook video URL!* ❤️");

      const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
      if (!fbRegex.test(q))
        return reply("*Invalid Facebook URL! Please check and try again.* ☹️");

      reply("*Downloading your video...* ❤️");

      const api = `https://api.vihangayt.com/facebook?url=${encodeURIComponent(q)}`;
      const res = await axios.get(api);

      if (!res.data.data)
        return reply("*Failed to fetch video. Try again later.*");

      const title = res.data.data.title || "Unknown Title";
      const hd = res.data.data.video_hd;
      const sd = res.data.data.video_sd;
      const bestUrl = hd || sd;
      const quality = hd ? "HD" : "SD";

      const desc = `
Your fb video
👻 *Title*: ${title}
👻 *Quality*: ${quality}
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
          video: { url: bestUrl },
          caption: `*📥 Downloaded in ${quality} quality*`,
        },
        { quoted: mek }
      );

      return reply("Thank you for using Thenuka Bot ❤️");

    } catch (e) {
      console.error(e);
      reply(`*Error:* ${e.message}`);
    }
  }
);
