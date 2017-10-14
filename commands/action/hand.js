const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class HandCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hand',
            aliases: ['handhold', 'holdhands'],
            group: 'action',
            memberName: 'hand',
            guildOnly: true,
            description: 'Holds hands with the user you mentioned!',
            examples: ['~hand <user>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");    
        if(!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.disgustP[Math.round(Math.random() * (actions.disgustP.length - 1))])
            return message.channel.send(`${message.author} holds hands with... themselves..?`, {embed: embed})
    
        } else if(message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.disgustP[Math.round(Math.random() * (actions.disgustP.length - 1))])
            return message.channel.send(`${message.author} holds hands with... themselves..?`, {embed: embed})
            
        } else {
            const recipient = message.content.split(/\s+/g).slice(1).join(" ");
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.handP[Math.round(Math.random() * (actions.handP.length - 1))])
            return message.channel.send(`${message.author} holds hands with ${recipient}!`, {embed: embed})
            }
	}
}