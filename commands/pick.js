const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const sentencePath = path.join(__dirname, "../data/sentences.json");
const historyPath = path.join(__dirname, "../data/drawHistory.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("뽑기")
        .setDescription("."),

    async execute(interaction) {

        const sentences = JSON.parse(fs.readFileSync(sentencePath, "utf8"));
        let history = JSON.parse(fs.readFileSync(historyPath, "utf8"));

        const available = sentences.filter(x => !history.includes(x));

        if (available.length === 0) {
            return interaction.reply({
                content: "모든 문장을 이미 뽑았습니다. `/초기화`를 사용해주세요.",
                ephemeral: true
            });
        }

        const random =
            available[Math.floor(Math.random() * available.length)];

        history.push(random);

        fs.writeFileSync(historyPath, JSON.stringify(history, null, 4));

        const embed = new EmbedBuilder()
            .setTitle("결과")
            .setDescription(random)
            .setColor("Random")

        await interaction.reply({
            embeds: [embed]
        });
    }
};