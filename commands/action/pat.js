const { Command } = require('../../commando');
const Discord = require('discord.js');
const { patP } = require('../../assets/json/actions.json');

module.exports = class PatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            aliases: ['pet'],
            group: 'action',
            memberName: 'pat',
            guildOnly: true,
            description: 'Pats the user you mentioned on the head!',
            examples: ['~pat <user>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var pat = patP[Math.round(Math.random() * (patP.length - 1))];

        if (!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(pat);
            return message.channel.send(`${message.author}, you can't pat yourself, but I'll pat you! (´꒳\`)`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(pat);
            return message.channel.send(`${message.author}, you can't pat yourself, but I'll pat you! (´꒳\`)`, { embed: embed });

        } else if (message.mentions.users.first() == this.client.user) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(pat);
            return message.channel.send(`H-Haa.. (✿´ ꒳ \` ) please don't stop...`, { embed: embed });

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(pat);
            return message.channel.send(`${message.author} pats ${recipient}!`, { embed: embed });
        }
    }
}