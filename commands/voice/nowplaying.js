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
        return message.channel.send('Sorry! This command is not yet available to the public!')
	}
}
