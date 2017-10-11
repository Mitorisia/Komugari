const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class CatGirlCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'catgirl',
            group: 'anime',
            memberName: 'catgirl',
            description: 'Shows a random catgirl!',
            examples: ['~catgirl']
        });
    }

    async run (message) {
        const res = await snekfetch.get(`http://nekos.life/api/neko`);
        const preview = res.body.neko;
            const embed = new Discord.MessageEmbed()
                .setImage(preview)
                .setColor('#A187E0')
                .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif');
        return message.channel.send({embed});
	}
}