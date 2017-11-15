const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class FCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'f',
            aliases: ['respect', 'respects', 'rip'],
            group: 'fun',
            memberName: 'f',
            guildOnly: true,
            description: 'Press F to pay respects',
            examples: ['~f <something you want to respect>'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: 'respect',
                prompt: 'Please provide me something to respect!',
                type: 'string',
                default: 'none'
            }]
        });
    }

    run(message, args) {
        const { respect } = args;
        if (respect == 'none') {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username} has paid their respects.`, message.author.displayAvatarURL({ format: 'png' }))
                .setColor('#4E373B')
                .setFooter(`Press F to pay your respects.`);
            message.channel.send({ embed }).then(m => m.react("🇫"));

            return null;

        } else {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`\u2000`, message.author.displayAvatarURL({ format: 'png' }))
                .setColor('#4E373B')
                .setDescription(`${message.author} has paid their respects to ${respect}`)
                .setFooter(`Press F to pay your respects.`);
            message.channel.send({ embed }).then(m => m.react("🇫"));

            return null;
        }
    }
}