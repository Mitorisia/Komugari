const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class NyanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nyan',
            aliases: ['nya'],
            group: 'action',
            memberName: 'nyan',
            guildOnly: true,
            description: 'Nya!',
            examples: ['~nyan'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run (message) {
        var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=nyan`);
        var body = JSON.parse(text.text);
    
        try{
            var recipient = message.content.split(/\s+/g).slice(1).join(" ");
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(`https://rra.ram.moe${body.path}`);
            return message.channel.send(`Nya!`, {embed:embed});
    
        } catch(err) {
            console.log(err);
            message.react('✖');

            return null;
        }
	}
}