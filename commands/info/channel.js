const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

//remember to return before every promise
module.exports = class ChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'channel',
            aliases: ['channels', 'channelinfo'],
            group: 'info',
            memberName: 'channel',
            description: 'Displays all channels of the server, or gives information on a channel!',
            examples: ['~channel <channel name>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        //code here
	}
}