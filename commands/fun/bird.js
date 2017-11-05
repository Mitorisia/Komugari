const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class BirdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bird',
            aliases: ['birb', 'burb', 'birbo'],
            group: 'fun',
            memberName: 'bird',
            guildOnly: true,
            description: 'Sends a random picture of a bird!',
            examples: ['~bird'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run(message) {
        const res = await snekfetch.get('http://random.birb.pw/tweet/');
        const image = res.body

        const embed = new Discord.MessageEmbed()
            .setImage(`http://random.birb.pw/img/${image}`)
            .setFooter('http://random.birb.pw/ ©', 'http://random.birb.pw/img/BPVpe.jpg')
            .setColor('#71A3BE');
        return message.channel.send({ embed });
    }
}