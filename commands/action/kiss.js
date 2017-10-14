const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class KissCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            aliases: ['smooch'],
            group: 'action',
            memberName: 'kiss',
            guildOnly: true,
            description: 'Kisses the user you mentioned!',
            examples: ['~kiss <user>'],
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
                .setImage(actions.disgustP[Math.round(Math.random() * (actions.disgustP.length - 1))]);
            return message.channel.send(`${message.author} kisses... themselves..?`, {embed: embed});
    
        } else if(message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.disgustP[Math.round(Math.random() * (actions.disgustP.length - 1))]);
            return message.channel.send(`${message.author} kisses... themselves..?`, {embed: embed});
            
        } else {
            const recipient = message.content.split(/\s+/g).slice(1).join(" ");
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.kissP[Math.round(Math.random() * (actions.kissP.length - 1))]);
            return message.channel.send(`${message.author} kisses ${recipient}!`, {embed: embed});
            }
	}
}