const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shutdown',
            guildOnly: true,
            aliases: ['die'],
            group: 'owner',
            memberName: 'die',
            description: 'Shuts down Komugari....',
            examples: ['~shutdown'],
        });
    }

    hasPermission(message) {
		return this.client.isOwner(message.author);
    }
    
    async run (message) {
        await message.channel.send('👋\u2000Restarting, see you!')
        return this.client.destroy()
	}
}