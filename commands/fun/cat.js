const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            aliases: ['kitty', 'meow', 'cate'],
            group: 'fun',
            memberName: 'cat',
            description: 'Sends a random picture of a cat!',
            examples: ['~cat'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run (message) {
        const res = await snekfetch.get('http://www.random.cat/meow');
        const image = res.body.file;
    
        const embed = new Discord.MessageEmbed()
            .setImage(image)
            .setFooter('http://www.random.cat ©', 'https://a.safe.moe/6GDXu.png')
            .setColor('#71A3BE');
        return message.channel.send({embed});
	}
}