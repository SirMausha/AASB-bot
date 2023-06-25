const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Character = sequelize.define('characters', {
	uuid: {
		type: Sequelize.STRING,
		unique: true,
	},
	name: Sequelize.TEXT,
	health: Sequelize.INTEGER,
	healthMax: Sequelize.INTEGER,
	posture: Sequelize.INTEGER,
	postureMax: Sequelize.INTEGER,
	ether: Sequelize.INTEGER,
	etherMax: Sequelize.INTEGER,
	insanity: Sequelize.INTEGER,
	insanityCap: Sequelize.INTEGER,
	strength: Sequelize.INTEGER,
	fortitude: Sequelize.INTEGER,
	agility: Sequelize.INTEGER,
	intelligence: Sequelize.INTEGER,
	willpower: Sequelize.INTEGER,
	charisma: Sequelize.INTEGER,
	weapon: Sequelize.INTEGER,
	power: Sequelize.INTEGER,
	attunement: Sequelize.TEXT,
});


module.exports = {
    sequelize,
    Character,
};
