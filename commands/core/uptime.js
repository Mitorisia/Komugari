const { Command } = require('../../commando');
const moment = require('moment');
require('moment-duration-format');

module.exports = class UptimeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'uptime',
			group: 'core',
			memberName: 'uptime',
			description: 'Tells you how long the I\'ve been running consistently!',
			guarded: true
		});
	}

	run(message) {
        var uptime = moment.duration(this.client.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]')
		return message.channel.send(`I've been up and running for **${uptime}**!`);
	}
};
