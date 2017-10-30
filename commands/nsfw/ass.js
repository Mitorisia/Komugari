const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const errors = require('../../assets/json/errors');


module.exports = class AssCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ass',
            aliases: ['butt', 'booty', 'butts'],
            group: 'nsfw',
            memberName: 'ass',
            guildOnly: true,
            description: 'A random picture of...ASS!!',
            examples: ['~ass'],
            details: 'This command can only be used in NSFW channels!',
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))]
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);

        } else {

            const id = [Math.floor(Math.random() * 4923)];
            const res = await snekfetch.get(`http://api.obutts.ru/butts/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.obutts.ru/${preview}`;

            const embed = new Discord.MessageEmbed()
                .setFooter('http://obutts.ru/')
                .setImage(image)
                .setColor('#CEA0A6');
            return message.channel.send({ embed });
        }
    }
}