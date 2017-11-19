const { Command } = require('../../commando');
const zalgo = require('zalgolize');

module.exports = class ZalgoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'zalgo',
			group: 'fun',
            memberName: 'zalgo',
            guildOnly: true,
            description: 'Converts your text into zalgo!',
            example: ['~zalgo [text]'],
			args: [{
				key: 'text',
				prompt: 'What text would you like to convert to zalgo?',
                type: 'string',
                default: 'Just Monika',
				validate: text => {
					if (text.length < 500) return true;
					return 'Text must be under 500 characters.';
				}
			}],
            throttling: {
                usages: 1,
                duration: 3
            }
		});
	}

	run(message, args) {
		const { text } = args;
		return message.channel.send(`\u180E${zalgo(text, 0.2, [10, 5, 10])}`);
	}
};
