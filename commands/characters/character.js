const { SlashCommandBuilder, Role, PermissionFlagsBits } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('character')
    .setDescription('Manages characters.')
    .addSubcommandGroup(subcommandGroup =>
      subcommandGroup
      .setName('admin')
      .setDescription('Admin commands')
      .addSubcommand(subcommand =>
        subcommand
          .setName('create')
          .setDescription('Admin command to create character and add it to the database.')
          .addStringOption(option => option.setName('name').setDescription('Character name').setRequired(true))
          .addIntegerOption(option => option.setName('health_max').setDescription('Character max health').setRequired(true))
          .addIntegerOption(option => option.setName('posture_max').setDescription('Character max posture').setRequired(true))
          .addIntegerOption(option => option.setName('ether_max').setDescription('Character max ether').setRequired(true))
          .addIntegerOption(option => option.setName('insanity_cap').setDescription('Character insanity cap').setRequired(true))
          .addIntegerOption(option => option.setName('strength').setDescription('Character strength').setRequired(true))
          .addIntegerOption(option => option.setName('fortitude').setDescription('Character fortitude').setRequired(true))
          .addIntegerOption(option => option.setName('agility').setDescription('Character agility').setRequired(true))
          .addIntegerOption(option => option.setName('intelligence').setDescription('Character intelligence').setRequired(true))
          .addIntegerOption(option => option.setName('willpower').setDescription('Character willpower').setRequired(true))
          .addIntegerOption(option => option.setName('charisma').setDescription('Character charisma').setRequired(true))
          .addIntegerOption(option => option.setName('weapon').setDescription('Character weapon').setRequired(true))
          .addIntegerOption(option => option.setName('power').setDescription('Character power').setRequired(true))
          .addStringOption(option => option.setName('attunement').setDescription('Character attunement').setRequired(true))
          .addUserOption(option => option.setName('user').setDescription('Owner of the character'))
      )
    )
    .addSubcommandGroup(subcommandGroup =>
      subcommandGroup
      .setName('user')
      .setDescription('User commands'))
      .addSubcommand(subcommand =>
      subcommand
        .setName('edit')
        .setDescription('Edits selected character')
        .addStringOption(option => option.setName('character').setDescription('Character name').setRequired(true))
        .addStringOption(option =>
          option.setName('stat')
            .setDescription('The stat you want to edit.')
            .setRequired(true)
            .addChoices(
              { name: 'Max Health', value: 'healthMax' },
              { name: 'Max Posture', value: 'postureMax' },
              { name: 'Max Ether', value: 'etherMax' },
              { name: 'Insanity Cap', value: 'insanityCap' },
              { name: 'strength', value: 'strength' },
              { name: 'fortitude', value: 'fortitude' },
              { name: 'agility', value: 'agility' },
              { name: 'intelligence', value: 'intelligence' },
              { name: 'willpower', value: 'willpower' },
              { name: 'charisma', value: 'charisma' },
              { name: 'weapon', value: 'weapon' },
              { name: 'power', value: 'power' },
              { name: 'attunement', value: 'attunement' }
            )
        )
    ),

    async execute(interaction) {

      // Check the subcommand and handle permissions accordingly
      if (interaction.options.getSubcommand() === 'create') {

        // Check if the user has the necessary permission for the subcommand group
        const isAdmin = interaction.member.roles.cache.some(role => role.id === '1108507806950228129');

        if (isAdmin) {

          // Execute the command logic for creating a character
          await interaction.reply('bob');

        } else {

          // User does not have permission, send an error message
          await interaction.reply('You do not have permission to use this command.');

        }
      } else if (interaction.options.getSubcommand() === 'edit') {

          await interaction.reply('You do not have permission to use this command.');

      }
    },
};


function addCharacterToDatabase() {
  
}

function editCharacter() {

}