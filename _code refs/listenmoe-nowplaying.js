const WebSocket = require('ws');

let kuro
let radioInfo
let ws

const Discord = require('discord.js')

exports.init = function(bot) {
	kuro = bot
	this.connectWS()
}

exports.connectWS = function() {
	if (ws) ws.removeAllListeners();
	ws = new WebSocket('wss://listen.moe/api/v2/socket');
	ws.on('message', data => {
		try {
			if (data) {
				const json = JSON.parse(data);
				if (json === undefined) return;
				if (json.reason !== undefined) return;
				radioInfo = json;
			}
		} catch (err) {
			console.error(err)
		}
	})
	ws.on('close', () => {
		setTimeout(() => { this.connectWS(); }, 10000);
	});
	ws.on('error', err => {
		console.log(err)
	});
}

exports.run = function(msg) {
	if (!radioInfo) return msg.edit('No data available');

	const artist = `${radioInfo.artist_name}` ? `${radioInfo.artist_name} - ` : '';
	const nowplaying = `${artist}${radioInfo.song_name}`;
	const anime = radioInfo.anime_name ? `Anime: ${radioInfo.anime_name}` : '';
	const requestedBy = radioInfo.requested_by
		? /\s/g.test(radioInfo.requested_by)
		? `🎉 **${Discord.escapeMarkdown(radioInfo.requested_by)}** 🎉`
		: `Requested by: [${Discord.escapeMarkdown(radioInfo.requested_by)}](https://forum.listen.moe/u/${radioInfo.requested_by})`
		: '';
	const song = `${Discord.escapeMarkdown(nowplaying)}\n\n${Discord.escapeMarkdown(anime)}\n${requestedBy}`;

	return msg.edit('', {
		embed: {
			type: 'rich',
			color: kuro.config.embedColor,
			fields: [
				{ name: 'Now playing', value: song }
			]
		}
	})
}
