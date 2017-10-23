const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

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

    run (message) {
        //code here
	}
}

