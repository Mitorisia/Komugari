const { Command } = require('discord.js-commando');
const Discord = require('discord.js');


module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Bans the given user and DMs them the reason!',
            examples: ['~ban [user] [reason]'],
            throttling: {
                usages: 1,
                duration: 15
            }
        });
    }

    run (message) {
        //code here
	}
}