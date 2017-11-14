const { Command } = require('../../commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['copycat', 'repeat', 'echo', 'parrot'],
            group: 'fun',
            memberName: 'say',
            guildOnly: true,
            description: 'Makes me say something for you.',
            examples: ['~say [sentence]'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: 'sayMessage',
                prompt: 'Please provide me a message to say!',
                type: 'string',
                default: 'N////A'
            }]
        });
    }

    run(message, args) {
        const { sayMessage } = args;
        if (sayMessage = 'N////A') return message.say('Please specify something for me to say!');

        return message.say(sayMessage).catch(console.error);
    }
}