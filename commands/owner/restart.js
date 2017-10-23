const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            guildOnly: true,
            aliases: ['reboot'],
            group: 'owner',
            memberName: 'restart',
            description: 'Restarts Komugari!',
            examples: ['~restart'],
        });
    }

    hasPermission(message) {
		return this.client.isOwner(message.author);
    }
    
    async run (message) {
        await message.channel.send('👋\u2000Restarting, see you!')
        return process.exit(42)
	}
}