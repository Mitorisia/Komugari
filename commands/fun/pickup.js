const { Command } = require('../../commando');
const Discord = require('discord.js');
const line = require('../../assets/json/pickuplines.json');


module.exports = class PickUpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pickup',
            aliases: ['pickupline'],
            group: 'fun',
            memberName: 'pickup',
            guildOnly: true,
            description: 'Get a random pick up line!',
            examples: ['~pickup'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {      
        try {
            const embed = new Discord.MessageEmbed()
                .setDescription('💖 | ' + line[Math.round(Math.random() * (line.length - 1))])
                .setColor('#C597B8');
          return message.channel.send({embed});
        
        } catch(err) {
          
          return message.channel.send(err)
        }
	}
}