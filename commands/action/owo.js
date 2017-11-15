const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class OwoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'owo',
            aliases: ['whatsthis'],
            group: 'action',
            memberName: 'owo',
            guildOnly: true,
            description: 'OWO what\'s this!',
            examples: ['~owo'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(message) {
        var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=owo`);
        var body = JSON.parse(text.text);

        var embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(`https://rra.ram.moe${body.path}`);
        return message.channel.send({ embed });
    }
}