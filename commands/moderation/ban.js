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
            },
            args: [
				{
					key: 'member',
					prompt: 'Please provide me a user to ban!',
					type: 'member'
				},
				{
					key: 'reason',
					prompt: 'Please provide me a reason to ban this member!',
					type: 'string',
					validate: reason => {
						if (reason.length < 140) return true;
						return 'Reason must be under 140 characters.';
					}
				}
			]
        });
    }

    run (message) {
        const { member, reason } = args;
	}
}