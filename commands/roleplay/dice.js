const { SlashCommandBuilder } = require('discord.js');
const crypto = require('crypto');

module.exports = {
    cooldown: 2,
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a d20 (for now).'),
	async execute(interaction) {

        result = getRandomNumber(1, 20)

        await interaction.reply(`You rolled ${result}!`)

	},
};

function getRandomNumber(min, max) {
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = randomBytes.readUInt32LE(0) / (0xffffffff + 1);
    return Math.floor(randomNumber * (max - min + 1) + min);
  }