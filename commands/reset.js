const {
    SlashCommandBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const historyPath = path.join(__dirname, "../data/drawHistory.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("초기화")
        .setDescription("뽑은 문장을 초기화합니다."),

    async execute(interaction) {

        fs.writeFileSync(historyPath, JSON.stringify([], null, 4));

        await interaction.reply({
            content: "문장 목록이 초기화되었습니다."
        });
    }
};