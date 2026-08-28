const config = require('../config');

module.exports = {
    name: "alive",
    alias: ["botinfo", "info"],
    desc: "Check bot online status & info",
    category: "general",
    async execute(conn, mek, m, { reply, pushName }) {
        try {
            // Read from config file
            let botInfo = (config.BOT_INFO || "ᴇᴠᴀ-ᴍᴀʀɪʏᴀ🕊️;𝑨𝒓𝒋𝒖𝒖;https://files.catbox.moe/svk9e1.jpg").split(';');
            let botName = botInfo[0] || "KIRA MD";
            let ownerName = botInfo[1] || "OWNER";
            let imageUrl = botInfo[2] || "https://files.catbox.moe/svk9e1.jpg";

            let caption = `👋 Hi ${pushName || 'User'},\n\n` +
                          `🤖 *Bot Name:* ${botName}\n` +
                          `👑 *Owner:* ${ownerName}\n` +
                          `⚡ *Status:* Online & Active 🚀\n\n` +
                          `> ${config.ALIVE || "Bot is running fine!"}`;

            // Send with Banner Image
            return await conn.sendMessage(m.chat, {
                image: { url: imageUrl },
                caption: caption
            }, { quoted: m });

        } catch (error) {
            console.error("Alive Error:", error);
            return reply(`❌ Error: ${error.message}`);
        }
    }
};
