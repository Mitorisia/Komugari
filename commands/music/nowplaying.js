const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const WebSocket = require('ws');

var ws;
var radioJSON = 'connecting...'

connectWS(this.client, 'wss://listen.moe/api/v2/socket');

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
                const nowplaying = `${radioJSON.artist_name ? `${radioJSON.artist_name} - ` : ''}${radioJSON.song_name}`;
		const anime = radioJSON.anime_name ? `\n\•\u2000Anime: ${radioJSON.anime_name}` : '';
		const requestedBy = radioJSON.requested_by ? `\n•\u2000Requested by: [${radioJSON.requested_by}](https://forum.listen.moe/u/${radioJSON.requested_by})` : '';
        const song = `•\u2000${nowplaying}${anime}${requestedBy}`;
        
        const embed = new Discord.MessageEmbed()
            .setAuthor('Now Playing', 'http://i.imgur.com/Jfz6qak.png')
            .setURL('https://listen.moe/')
            .setColor('#DB2460')
            .setDescription(song)
            .setFooter(radioJSON.listeners + ' radio listeners!')
            .setThumbnail('http://i.imgur.com/Jfz6qak.png');
        return message.channel.send({embed})
	}
}

function connectWS(client,info) {
	if (ws) ws.removeAllListeners();
	try {
		ws = new WebSocket(info);
		console.log(`WEBSOCKET: Connection A-OK!`);
	} catch (error) {
		setTimeout(() => connectWS(client,info), 3000);
		console.log(`WEBSOCKET: Couldn't connect, reconnecting...`);
	}

	ws.on('message', data => {
		try {
			if (data) {
                radioJSON = JSON.parse(data);
			}
		} catch (error) {
			console.log(error);
		}
	});
	ws.on('close', () => {
		setTimeout(() => connectWS(client,info), 3000);
		console.log(`WEBSOCKET: Connection closed, reconnecting...`);
	});
	ws.on('error', console.log);
}