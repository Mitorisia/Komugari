const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const waifus = require('../../assets/json/waifus.json');

module.exports = class EightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'waifu',
            group: 'fun',
            memberName: 'waifu',
            guildOnly: true,
            description: 'Finds you a waifu!',
            examples: ['~waifu'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {      
        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Here's a pun!`, this.client.displayAvatarURL())
                .setDescription("no")
                .setColor('#FAC193');
          return message.channel.send({embed});
        
        } catch(err) {
          message.react('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658>');
          return message.channel.send(err)
        }
	}
}