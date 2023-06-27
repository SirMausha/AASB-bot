const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 2,
  data: new SlashCommandBuilder()
    .setName("combat")
    .setDescription("Manages combat mode")
    .addSubcommandGroup((subcommandgroup) =>
      subcommandgroup
        .setName("admin")
        .setDescription("Admin commands")
        //
        .addSubcommand((subcommand) =>
          subcommand.setName("placeholder").setDescription("placeholder")
        )
    )
    .addSubcommandGroup((subcommandgroup) =>
      subcommandgroup
        .setName("user")
        .setDescription("Regular user commands")
        .addSubcommand((subcommand) =>
          subcommand.setName("placeholder").setDescription("placeholder")
        )
    ),

  async execute(interaction) {
    await interaction.reply("cool");
  },
};
