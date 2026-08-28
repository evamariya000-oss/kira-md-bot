const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = {
    name: "setphoto",
    alias: ["setpp", "fullpp", "setprofile"],
    desc: "Changes the Bot Profile Picture",
    category: "owner",
    async execute(conn, mek, m, { isOwner, reply }) {
        try {
            // Check Owner Permission
            if (!isOwner) {
                return reply("❌ *Access Denied:* Only the Bot Owner can use this command!");
            }

            // Check if Image is Quoted or Attached
            const isQuotedImage = m.quoted && (m.quoted.mtype === 'imageMessage');
            const isImage = m.mtype === 'imageMessage';

            if (!isImage && !isQuotedImage) {
                return reply("⚠️ *Usage:* Reply to an image with `.setphoto` to update profile picture.");
            }

            reply("⏳ *Updating Bot Profile Picture, please wait...*");

            // Target the correct message (quoted or current)
            const targetMessage = isQuotedImage ? m.quoted : m;

            // Download media buffer directly using Baileys helper
            const mediaBuffer = await downloadMediaMessage(
                targetMessage,
                'buffer',
                {},
                { 
                    reConnect: conn.ws
                }
            );

            if (!mediaBuffer) {
                return reply("❌ *Error:* Image download cheyyan pattiyilla.");
            }

            // Update WhatsApp Profile Picture
            const botJid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
            await conn.updateProfilePicture(botJid, mediaBuffer);

            return reply("✅ *Success:* Profile picture successfully update aayi!");

        } catch (error) {
            console.error("SetPhoto Error:", error);
            return reply(`❌ *Error:* Profile picture change aayilla.\n\n*Details:* ${error.message || error}`);
        }
    }
};
