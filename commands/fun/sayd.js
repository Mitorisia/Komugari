const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sayd',
            aliases: ['copycatd', 'repeatd', 'echod', 'parrotd'],
            group: 'fun',
            memberName: 'sayd',
            guildOnly: true,
            description: 'Makes me say something for you, and then delete it!',
            examples: ['~say [sentence]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
	let sayMessage = message.content.split(/\s+/g).slice(1).join(" ");
    if(!sayMessage) return message.say('Please specify something for me to say.');
        message.delete();
		return message.say(sayMessage).catch(console.error);
	}
}