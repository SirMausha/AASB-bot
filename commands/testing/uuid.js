const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('uuid')
    .setDescription('Replies with the user\'s UUID!'),
  async execute(interaction) {
    const userId = interaction.user.id;
    await interaction.reply(`Your Discord UUID is: ${userId}`);
  },
};
