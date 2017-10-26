const { Command } = require('../../commando');
const Discord = require('discord.js');
const iku = require('../../assets/json/iku.json');

module.exports = class IkuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'iku',
            guildOnly: true,
            aliases: ['bestgirl', 'i19'],
            group: 'owner',
            memberName: 'iku',
            description: 'Iku is best girl and there\'s no denying it!!',
            examples: ['~iku'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
        const embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(iku[Math.round(Math.random() * (iku.length - 1))]);
        return message.channel.send({embed});
	}
}