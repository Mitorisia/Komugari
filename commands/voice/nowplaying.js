const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch')

module.exports = class NowPlayingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nowplaying',
            guildOnly: true,
            aliases: ['np', 'playing'],
            group: 'voice',
            memberName: 'nowplaying',
            description: 'Shows the currently playing song on Listen.moe!',
            examples: ['~nowplaying'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run (message) {
        const res = await snekfetch.get(`https://feed.tunein.com/profiles/s277012/nowPlaying`);
        var body = JSON.parse(res.body);

        if(!body.Secondary) return message.channel.send('There was an error retrieving the data!');

        const embed = new Discord.MessageEmbed()
            .setAuthor('Currently Playing', body.Secondary.Image)
            .setFooter('Listen.moe JPOP + Anime Radio!')
            .setDescription(body.Secondary.Title)
            .setThumbnail(body.Secondary.Image);
        return message.channel.send({embed});
	}
}