const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class GropeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'grope',
            group: 'action',
            memberName: 'grope',
            description: 'Gropes..? the user you mentioned...?',
            examples: ['~grope [user]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        if(!recipient) {
            var embed = new Discord.MessageEmbed()
                .setColor('#F2B8A4')
                .setImage(actions.disgustP[Math.round(Math.random() * (actions.disgustP.length - 1))])
            return message.channel.send(`${message.author} gropes... themselves..?`, {embed: embed})
    
        } else if(message.mentions.users.first() == message.author) {
            var embed = new Discord.MessageEmbed()
                .setColor('#F2B8A4')
                .setImage(actions.disgustP[Math.round(Math.random() * (actions.disgustP.length - 1))])
            return message.channel.send(`${message.author} gropes... themselves..?`, {embed: embed})
            
        } else {
            var recipient = message.content.split(/\s+/g).slice(1).join(" ");
            var embed = new Discord.MessageEmbed()
                .setColor('#F2B8A4')
                .setImage(actions.gropeP[Math.round(Math.random() * (actions.gropeP.length - 1))])
            return message.channel.send(`${message.author} has started... groping ${recipient}?`, {embed: embed})
            }
	}
}