const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class LizardCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lizard',
            aliases: ['liz'],
            group: 'fun',
            memberName: 'lizard',
            guildOnly: true,
            description: 'Sends a random picture of a lizard!',
            examples: ['~lizard'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run(message) {
        const res = await snekfetch.get('https://nekos.life/api/lizard');
        const image = res.body.url

        const embed = new Discord.MessageEmbed()
            .setImage(image)
            .setFooter('https://nekos.life/ ©', 'https://nekos.life/static/lizard/010C.jpg')
            .setColor('#71A3BE');
        return message.channel.send({ embed });
    }
}