const { sequelize, Character } = require('../../db');
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
          .addUserOption(option => option.setName('user').setDescription('Owner of the character').setRequired(true))
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
      )
      .addSubcommand(subcommand =>
        subcommand
        .setName('view')
        .setDescription('Views a character')),

    async execute(interaction) {

      try {
        await execute(interaction)
      } catch (error) {
        console.error(error);
        return interaction.editReply('An error occurred while executing the command.');
      }

      // Check the subcommand and handle permissions accordingly
      async function execute(interaction) {
        // Check the subcommand and handle permissions accordingly
        if (interaction.options.getSubcommand() === 'create') {
          await interaction.deferReply();
      
          // Check if the user has the necessary permission for the subcommand group
          const isAdmin = interaction.member.roles.cache.some(role => role.id === '1108507806950228129');
      
          if (isAdmin) {
            // Execute the command logic for creating a character
            const charName = interaction.options.getString('name');
            const charHealth = interaction.options.getInteger('health_max');
            const charPosture = interaction.options.getInteger('posture_max');
            const charEther = interaction.options.getInteger('ether_max');
            const charInsanity = interaction.options.getInteger('insanity_cap');
            const charStrength = interaction.options.getInteger('strength');
            const charFortitude = interaction.options.getInteger('fortitude');
            const charAgility = interaction.options.getInteger('agility');
            const charIntelligence = interaction.options.getInteger('intelligence');
            const charWillpower = interaction.options.getInteger('willpower');
            const charCharisma = interaction.options.getInteger('charisma');
            const charWeapon = interaction.options.getInteger('weapon');
            const charPower = interaction.options.getInteger('power');
            const charAttunement = interaction.options.getString('attunement');
            const charUser = interaction.options.getUser('user');
      
            const replyMessage = await addCharacterToDatabase(
              charName,
              charHealth,
              charPosture,
              charEther,
              charInsanity,
              charStrength,
              charFortitude,
              charAgility,
              charIntelligence,
              charWillpower,
              charCharisma,
              charWeapon,
              charPower,
              charAttunement,
              charUser
            );
      
            return interaction.editReply(replyMessage);
          } else {
            // User does not have permission, send an error message
            return interaction.editReply('You do not have permission to use this command.');
          }
        } else if (interaction.options.getSubcommand() === 'edit') {
          return interaction.editReply('You do not have permission to use this command.');
        } else if (interaction.options.getSubcommand() === 'view') {
          const charList = await Character.findAll();
          const attributes = Object.keys(Character.rawAttributes); // Retrieve attribute names
          
          let charString = '';
          for (const char of charList) {
            charString += `Character ID: ${char.id}\n`;
            for (const attribute of attributes) {
              charString += `${attribute}: ${char[attribute]}\n`;
            }
            charString += '\n';
          }
        
          if (charString === '') {
            charString = 'No characters found.';
          }
          
          await interaction.reply(`List of characters:\n${charString}`);
        }
      }



      async function addCharacterToDatabase(name, healthMax, postureMax, etherMax, insanityCap, strength, fortitude, agility, intelligence, willpower, charisma, weapon, power, attunement, user) {
        const charHealth = healthMax;
        const charPosture = postureMax;
        const charEther = etherMax;
        const charInsanity = insanityCap;
      
        try {
          // Add character to database
          const character = await Character.create({
            name: name,
            health: charHealth,
            healthMax: healthMax,
            posture: charPosture,
            postureMax: postureMax,
            ether: charEther,
            etherMax: etherMax,
            insanity: charInsanity,
            insanityCap: insanityCap,
            strength: strength,
            fortitude: fortitude,
            agility: agility,
            intelligence: intelligence,
            willpower: willpower,
            charisma: charisma,
            weapon: weapon,
            power: power,
            attunement: attunement,
            user: user,
          });
      
          return `Character ${character.name} added.`;
        } catch (error) {
          console.error('Error adding character:', error);
          if (error.name === 'SequelizeUniqueConstraintError') {
            return 'Character already exists!';
          }
      
          return 'Something went wrong with adding a character. Check your parameters, or reach out to Jin if the issue persists.';
        }
      }
      
    },
};


function editCharacter() {

}