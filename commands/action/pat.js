const { Command } = require('../../commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

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
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        if (!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.patP[Math.round(Math.random() * (actions.patP.length - 1))]);
            return message.channel.send(`${message.author}, you can't pat yourself, but I'll pat you!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.patP[Math.round(Math.random() * (actions.patP.length - 1))]);
            return message.channel.send(`${message.author}, you can't pat yourself, but I'll pat you!`, { embed: embed });

        } else {
            const recipient = message.content.split(/\s+/g).slice(1).join(" ");
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.patP[Math.round(Math.random() * (actions.patP.length - 1))]);
            return message.channel.send(`${message.author} pats ${recipient}!`, { embed: embed });
        }
    }
}