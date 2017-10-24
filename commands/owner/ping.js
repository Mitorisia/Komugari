const { Command } = require('../../commando');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'owner',
			memberName: 'ping',
			description: 'Checks the ping latency!',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run (message) {
		const pingMsg = await message.channel.send('Pinging...');
		return pingMsg.edit(`🏓 | Pong! Took ${pingMsg.createdTimestamp - message.createdTimestamp}ms.`);
	}
};