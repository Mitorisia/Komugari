const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['copycat', 'repeat', 'echo', 'parrot'],
            group: 'fun',
            memberName: 'say',
            description: 'Makes Komugari say something for you.',
            examples: ['~say [sentence]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
	let sayMessage = message.content.split(/\s+/g).slice(1).join(" ");
	if(!sayMessage) return message.say('Please specify something for me to say.')
			return message.say(sayMessage).catch(console.error);
	}
}