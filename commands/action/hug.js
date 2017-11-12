const { Command } = require('../../commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            aliases: ['cuddle'],
            group: 'action',
            memberName: 'hug',
            guildOnly: true,
            description: 'Hugs the user you mentioned!',
            examples: ['~hug <user>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        if (!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.hugP[Math.round(Math.random() * (actions.hugP.length - 1))]);
            return message.channel.send(`You can't hug yourself, but I'll hug you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.hugP[Math.round(Math.random() * (actions.hugP.length - 1))]);
            return message.channel.send(`You can't hug yourself, but I'll hug you, ${message.author}!`, { embed: embed });

        } else {
            const recipient = message.content.split(/\s+/g).slice(1).join(" ");
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.hugP[Math.round(Math.random() * (actions.hugP.length - 1))]);
            return message.channel.send(`${message.author} hugs ${recipient}!`, { embed: embed });
        }
    }
}