const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const { formatXml } = require('../../commando/util')

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            aliases: ['kitty', 'meow', 'cate'],
            group: 'fun',
            memberName: 'cat',
            guildOnly: true,
            description: 'Sends a random picture of a cat!',
            examples: ['~cat'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run(message) {
        var catID = ('000' + (Math.floor(Math.random() * 773) + 1)).substr(-3);

        const embed = new Discord.MessageEmbed()
            .setImage(`https://nadeko-pictures.nyc3.digitaloceanspaces.com/cats/${catID}.png`)
            .setColor('#71A3BE');
        return message.channel.send({ embed });
    }
}