const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class CryCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cry',
            aliases: ['sob', 'waa'],
            group: 'action',
            memberName: 'cry',
            description: 'UWAA~',
            examples: ['~cry'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
        const embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(actions.cryP[Math.round(Math.random() * (actions.cryP.length - 1))]);
        return message.channel.send(`${message.author} has started crying!`, {embed: embed});
	}
}