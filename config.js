const fs = require("fs");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

function toBool(value) {
    return value === "true";
}

if (fs.existsSync("config.env")) {
    dotenv.config({ path: "./config.env" });
}

// Database Connection
const DATABASE_URL = process.env.DATABASE_URL || "sqlite://./database.db";

const DATABASE = DATABASE_URL.startsWith("sqlite://") 
    ? new Sequelize(DATABASE_URL, {
        dialect: "sqlite",
        storage: DATABASE_URL.replace("sqlite://", ""),
        logging: false
    }) 
    : new Sequelize(DATABASE_URL, {
        dialect: "postgres",
        protocol: "postgres",
        ssl: true,
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false }
        },
        logging: false
    });

DATABASE.authenticate()
    .then(() => console.log("Database connection established successfully."))
    .catch((err) => console.error("Database connection failed:", err.message));

module.exports = {
    VERSION: require("./package.json").version || "1.0.0",
    SESSION_ID: process.env.SESSION_ID || "",
    SUDO: process.env.SUDO || "917012984396",
    WORK_TYPE: process.env.WORK_TYPE || "public",
    
    // Bot Info & Branding
    BOT_INFO: process.env.BOT_INFO || "KIRA MD;MY BOT;https://url.sparky.biz.id/5ftLiA.jpg",
    AUDIO_DATA: process.env.AUDIO_DATA || "KIRA MD;MY BOT;https://files.catbox.moe/ttdne9.jpg",
    STICKER_DATA: process.env.STICKER_DATA || "KIRA MD;MY BOT",
    ALIVE: process.env.ALIVE || "Hello! I am Active Online 🚀",
    
    // Auto Features
    AUTO_STATUS_VIEW: toBool(process.env.AUTO_STATUS_VIEW || "true"),
    STATUS_REACTION: toBool(process.env.STATUS_REACTION || "true"),
    STATUS_REACTION_EMOJI: process.env.STATUS_REACTION_EMOJI || "🍉,🍓,🎀,💀,💗,📍,🔪,🛒,☠️,🐍,👍🏻",
    SAVE_STATUS: toBool(process.env.SAVE_STATUS || "false"),
    STATUS_REPLY: toBool(process.env.STATUS_REPLY || "false"),
    STATUS_REPLY_MSG: process.env.STATUS_REPLY_MSG || "Nice Status Brother 🦫✨",
    
    // Call Security Settings
    REJECT_CALL: toBool(process.env.REJECT_CALL || "false"),
    REJECT_CALL_MSG: process.env.REJECT_CALL_MSG || "_Calls are not allowed. Please don’t call again!_",
    
    // Menu Customization
    MENU_TYPE: process.env.MENU_TYPE || "image",
    MENU_FONT: process.env.MENU_FONT || "tiny",
    HANDLERS: (process.env.HANDLERS || process.env.PREFIX || ".").trim(),
    
    // Database Export
    DATABASE_URL,
    DATABASE
};
