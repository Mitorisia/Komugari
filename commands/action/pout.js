const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

//remember to return before every promise
module.exports = class PoutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pout',
            group: 'action',
            memberName: 'pout',
            guildOnly: true,
            description: 'uWaa??',
            examples: ['~pout'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        if (!recipient) {
            var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=pout`);
            var body = JSON.parse(text.text);

            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(`https://rra.ram.moe${body.path}`);
            return message.channel.send(`${message.author} has started pouting!`, { embed: embed });

        } else {

            var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=pout`);
            var body = JSON.parse(text.text);
            var recipient = message.content.split(/\s+/g).slice(1).join(" ");
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(`https://rra.ram.moe${body.path}`);
            return message.channel.send(`${message.author} pouts at ${recipient}!`, { embed: embed });
        }
    }
}