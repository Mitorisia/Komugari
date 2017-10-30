const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class NowPlayingCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'nowplaying',
                guildOnly: true,
                aliases: ['np', 'playing'],
                group: 'music',
                memberName: 'nowplaying',
                description: 'Shows the currently playing song on Listen.moe!',
                examples: ['~nowplaying'],
                throttling: {
                    usages: 1,
                    duration: 5
                }
            });
        }

        async run(message) {
                const { radioInfo } = this.client;
                const nowplaying = `${radioInfo.artist_name ? `${radioInfo.artist_name} - ` : ''}${radioInfo.song_name}`;
		    const anime = radioInfo.anime_name ? `\n\•\u2000Anime: ${radioInfo.anime_name}` : '';
		    const requestedBy = radioInfo.requested_by ? `\n•\u2000Requested by: [${radioInfo.requested_by}](https://forum.listen.moe/u/${radioInfo.requested_by})` : '';
            const song = `•\u2000${nowplaying}${anime}${requestedBy}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('Now Playing', 'http://i.imgur.com/Jfz6qak.png')
            .setURL('https://listen.moe/')
            .setColor('#DB2460')
            .setDescription(song)
            .setFooter(radioInfo.listeners + ' radio listeners!')
            .setThumbnail('http://i.imgur.com/Jfz6qak.png');
        return message.channel.send({embed})
	}
}