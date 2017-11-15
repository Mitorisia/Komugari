const { Command } = require('../../commando');
const Discord = require('discord.js');
const { disgustP } = require('../../assets/json/actions.json');

module.exports = class DisgustCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'disgust',
            aliases: ['gross', 'eww'],
            group: 'action',
            memberName: 'disgust',
            guildOnly: true,
            description: 'Absolutely **disgusting**, now which one of you likes handholding?',
            examples: ['~disgust'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run(message) {
        const embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(disgustP[Math.round(Math.random() * (disgustP.length - 1))]);
        return message.channel.send({ embed });
    }
}