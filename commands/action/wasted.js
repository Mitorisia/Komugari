const { Command } = require('../../commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class WastedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wasted',
            aliases: ['rekt', 'wrecked'],
            group: 'action',
            memberName: 'wasted',
            guildOnly: true,
            description: 'W A S T E D',
            examples: ['~wasted <user>'],
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
                .setImage(actions.wastedP[Math.round(Math.random() * (actions.wastedP.length - 1))]);
            return message.channel.send(`${message.author} got wasted!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.wastedP[Math.round(Math.random() * (actions.wastedP.length - 1))]);
            return message.channel.send(`${message.author} got wasted!`, { embed: embed });

        } else {
            const recipient = message.content.split(/\s+/g).slice(1).join(" ");
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.wastedP[Math.round(Math.random() * (actions.wastedP.length - 1))]);
            return message.channel.send(`${recipient} just got wasted!`, { embed: embed });
        }
    }
}