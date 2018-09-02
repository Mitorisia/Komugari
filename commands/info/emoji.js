const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class EmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            aliases: ['emojis', 'emotes', 'emote'],
            group: 'info',
            memberName: 'emoji',
            guildOnly: true,
            description: 'Makes your given emoji bigger, or sends all your server emojis!',
            examples: ['~emoji <emoji>'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'emoji',
                prompt: 'Please give me an emoji to magnify!',
                type: 'string',
                default: ''
            }]
        });
    }

    async run(message, args) {
        let emoji = message.content.split(/\s+/g).slice(1).join(" ")

        if (!emoji) {
            const emojis = message.guild.emojis
            if (!emojis.size) return message.channel.send('You have no custom emoji.');


            const embed = new Discord.MessageEmbed()
                .setAuthor(`Emojis in ${message.guild.name}! [${emojis.size}]`, message.guild.iconURL())
		        .setDescription(emojis.map(emoji => emoji.toString()).join(' '), { split: { char: ' ' } })
                .setColor('#A5A3BB')
            return message.channel.send(`Here's all your custom emojis!`, { embed: embed });

        } else {
            const args = message.content.split(" ");

            if (!args[1].startsWith('<:')) return message.channel.send('That\'s not a valid emoji!')
            let id = args[1].substring(args[1].lastIndexOf(':') + 1, args[1].lastIndexOf('>'))

            let emoteInfo = this.client.emojis.get(id)
            if (!emoteInfo) return message.channel.send('That\'s not a valid custom emoji!')

            const embed = new Discord.MessageEmbed()
                .setAuthor(emoteInfo.name)
                .setImage(`https://cdn.discordapp.com/emojis/${emoteInfo.id}.png`)
                .setColor('#D5BEC6');
            return message.channel.send({ embed });
        }
    }
}