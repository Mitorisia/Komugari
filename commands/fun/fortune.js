const { Command } = require('../../commando');
const Discord = require('discord.js');
const fortune = require('../../assets/json/fortune.json');


module.exports = class FortuneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fortune',
            aliases: ['ft', 'fortunecookie'],
            group: 'fun',
            memberName: 'fortune',
            guildOnly: true,
            description: 'Get a random fortune!',
            examples: ['~fortune'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s fortune`, "https://a.safe.moe/KBMis.png")
            .setDescription(fortune[Math.round(Math.random() * (fortune.length - 1))])
            .setColor('#FAC193');
        return message.channel.send({ embed });
    }
}