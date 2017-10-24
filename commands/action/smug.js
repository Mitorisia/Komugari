//powered by smugs.safe.moe!!

const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch =  require('snekfetch');

module.exports = class SmugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'smug',
            group: 'action',
            memberName: 'smug',
            guildOnly: true,
            description: 'the epitome of arguments: smug anime girls.',
            examples: ['~smug'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run (message) {
        var text = await snekfetch.get(`http://smugs.safe.moe/api/v1/i/r`);
        var body = JSON.parse(text.text);

        var embed = new Discord.MessageEmbed()
            .setColor('#727293')
            .setImage(`https://smugs.safe.moe/${body.url}`);
        return message.channel.send({embed});
	}
}