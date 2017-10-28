const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const WebSocket = require('ws');


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
        let radioInfo
        let ws

        function connectWS() {
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

        this.connectWS()

        if (!radioInfo) return message.channel.send('Something went wrong! Please report this issue!');
        
        const artist = `${radioInfo.artist_name}` ? `${radioInfo.artist_name} - ` : '';
        const nowplaying = `${artist}${radioInfo.song_name}`;
        const anime = radioInfo.anime_name ? `Anime: ${radioInfo.anime_name}` : '';
        const requestedBy = radioInfo.requested_by
            ? /\s/g.test(radioInfo.requested_by)
            ? `🎉 **${Discord.escapeMarkdown(radioInfo.requested_by)}** 🎉`
            : `Requested by: [${Discord.escapeMarkdown(radioInfo.requested_by)}](https://forum.listen.moe/u/${radioInfo.requested_by})`
            : '';
        const song = `${Discord.escapeMarkdown(nowplaying)}\n\n${Discord.escapeMarkdown(anime)}\n${requestedBy}`;
        
        return message.channel.send('', {
            embed: {
                type: 'rich',
                fields: [
                    { name: 'Now playing', value: song }
                ]
            }
        })
        
	}
}
