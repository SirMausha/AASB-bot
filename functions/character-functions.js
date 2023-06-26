const { sequelize, Character } = require('../db');

async function viewCharacter(interaction) {
    let characterOwner;

    if (interaction.options.getUser('user')) {
      const user = interaction.options.getUser('user').id;
      characterOwner = user;
    }

    try {
      const charList = await Character.findAll({
        where: { uuid: characterOwner },
        raw: true,
      });
      
      if (charList.length === 0) {
        return interaction.reply('No characters found.');
      }

      let charString = '';
      for (const char of charList) {
        charString += `Character ID: ${char.id}\n`;
        charString += `Owner UUID: ${char.uuid}\n`; 
        charString += `Name: ${char.name}\n`;
        charString += `Max Health: ${char.healthMax}\n`;
        charString += `Max Posture: ${char.postureMax}\n`;
        charString += `Max Ether: ${char.etherMax}\n`;
        charString += `Insanity Cap: ${char.insanityCap}\n`;
        charString += `Strength: ${char.strength}\n`;
        charString += `Fortitude: ${char.fortitude}\n`;
        charString += `Agility: ${char.agility}\n`;
        charString += `Intelligence: ${char.intelligence}\n`;
        charString += `Willpower: ${char.willpower}\n`;
        charString += `Charisma: ${char.charisma}\n`;
        charString += `Weapon: ${char.weapon}\n`;
        charString += `Power: ${char.power}\n`;
        charString += `Attunement: ${char.attunement}\n\n`;
      }
      
      await interaction.reply(`List of characters:\n${charString}`);
    } catch (error) {
      console.error('Error viewing characters:', error);
      return interaction.reply('There was an error while viewing the character. ERR: C4');
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
        uuid: user,
      });
  
      return `Character ${character.name} added.`;
    } catch (error) {
      console.error('Error adding character:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return 'Character already exists! ERR: C2';
      }
  
      return 'Something went wrong with adding a character. Check your parameters, or reach out to Jin if the issue persists. ERR: C3';
    }
}


async function editCharacter() {

}




module.exports = {
    viewCharacter,
    addCharacterToDatabase,
};