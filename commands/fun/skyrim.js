const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const line = require('../../assets/json/skyrim.json');


module.exports = class SkyrimCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skyrim',
            aliases: ['guard', 'skyrimguard', 'guardline'],
            group: 'fun',
            memberName: 'skyrim',
            guildOnly: true,
            description: 'Get a random guard quote from skyrim!',
            examples: ['~skyrim'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {      
        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(line[Math.round(Math.random() * (line.length - 1))])
                .setColor('#613921');
          return message.channel.send({embed});
        
        } catch(err) {
          message.react('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658>');
          return message.channel.send(err)
        }
	}
}