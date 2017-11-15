const { Command } = require('../../commando');
const Discord = require('discord.js');
const { wastedP } = require('../../assets/json/actions.json');

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
        const wasted = wastedP[Math.round(Math.random() * (wastedP.length - 1))];

        if (!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(wasted);
            return message.channel.send(`${message.author} got wasted!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(wasted);
            return message.channel.send(`${message.author} got wasted!`, { embed: embed });

        } else if (message.mentions.users.first() == this.client.user) {
            return message.channel.send(`${message.author}... please don't bully me! (๑◕︵◕๑)`);

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(wasted);
            return message.channel.send(`${recipient} just got wasted!`, { embed: embed });
        }
    }
}