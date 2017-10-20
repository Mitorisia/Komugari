const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const pun = require('../../assets/json/pun.json');


module.exports = class EightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pun',
            aliases: ['joke'],
            group: 'fun',
            memberName: 'pun',
            guildOnly: true,
            description: 'Get a random pun!',
            examples: ['~pun'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {      
        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Here's a pun!`, "https://a.safe.moe/X1gKJ.png")
                .setDescription(pun[Math.round(Math.random() * (pun.length - 1))])
                .setColor('#FAC193');
          return message.channel.send({embed});
        
        } catch(err) {
          message.react('✖');
          return message.channel.send(err)
        }
	}
}