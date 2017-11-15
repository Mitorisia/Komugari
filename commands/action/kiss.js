const { Command } = require('../../commando');
const Discord = require('discord.js');
const { kissP } = require('../../assets/json/actions.json');

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

    run(message) {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var kiss = kissP[Math.round(Math.random() * (kissP.length - 1))]

        if (!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`You can't kiss yourself, but I'll kiss you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`You can't kiss yourself, but I'll kiss you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == this.client.user) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`I-It's not like I wanted you to kiss me or anything...・:*(〃・ｪ・〃人)*:・`, { embed: embed });

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`${message.author} kisses ${recipient}!`, { embed: embed });
        }
    }
}