const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SmugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'smug',
            group: 'action',
            memberName: 'smug',
            guildOnly: true,
            description: 'the epitome of arguments: smug anime girls.',
            examples: ['~smug'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        var randomNumber = Math.floor(Math.random() * 58) + 1;
        const embed = new Discord.MessageEmbed()
            .setImage(`http://smug.moe/smg/${randomNumber}.png`)
            .setColor('#9D9DBD');
        return message.channel.send({embed});
	}
}