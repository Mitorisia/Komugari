const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const errors = require('../../assets/json/errors');

module.exports = class GTNCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gtn',
            aliases: ['nsfwcomics'],
            group: 'nsfw',
            memberName: 'gtn',
            guildOnly: true,
            description: 'Finds a GreenTeaNeko comic!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~gtn'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        var text = await snekfetch.get(`https://rra.ram.moe/i/r?nsfw=true`);
        var body = JSON.parse(text.text);

        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(`https://rra.ram.moe${body.path}`);
        return message.channel.send({ embed });
    }
}