const { Command } = require('../../commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class NoBullyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nobully',
            aliases: ['antibully'],
            group: 'action',
            memberName: 'nobully',
            guildOnly: true,
            description: 'Absolutely no bullying allowed!',
            examples: ['~nobully <user>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");        
        if(!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.nobullyP[Math.round(Math.random() * (actions.nobullyP.length - 1))]);
            return message.channel.send({embed: embed});
    
        } else {
            const recipient = message.content.split(/\s+/g).slice(1).join(" ");
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.nobullyP[Math.round(Math.random() * (actions.nobullyP.length - 1))]);
            return message.channel.send(`${recipient}, pls no bulli!!`, {embed: embed});
            }
	}
}