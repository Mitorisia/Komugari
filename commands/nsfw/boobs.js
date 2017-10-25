const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const errors = require('../../assets/json/errors');


module.exports = class BoobsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'boobs',
            aliases: ['boobies', 'bobs'],
            group: 'nsfw',
            memberName: 'boobs',
            guildOnly: true,
            description: 'Show a picture of boobs!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~boobs'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run (message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if(!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);

        } else {
        
            const id = [Math.floor(Math.random() * 10930)];
            const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.oboobs.ru/${preview}`;

            const embed = new Discord.MessageEmbed()
                .setFooter('http://oboobs.ru/')
                .setImage(image)
                .setColor('#CEA0A6');
            return message.channel.send({embed});
        }
	}
}