const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');


module.exports = class DadJokeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dadjoke',
            aliases: ['dadpun', 'joke', 'pun'],
            group: 'fun',
            memberName: 'dadjoke',
            guildOnly: true,
            description: 'Get a random dad joke!',
            examples: ['~dadjoke'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(message) {
        var joke = await snekfetch.get
            .get("https://icanhazdadjoke.com/")
            .set("Accept", "application/json");

        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Here's a joke!`, 'https://a.safe.moe/X1gKJ.png')
                .setDescription(joke.body.joke)
                .setColor('#727684');
            return message.channel.send({ embed });

        } catch (err) {
            return message.channel.send(`Consult your dad! My API isn't working!`)
        }
    }
}