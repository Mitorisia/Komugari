const { Command } = require('../../commando')
const pasta = require('../../assets/json/pasta.json');

module.exports = class EasterEggCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pasta',
            aliases: ['tag', 'tags'],
            group: 'fun',
            memberName: 'pasta',
            guildOnly: true,
            description: 'Cool custom pastas that I\'ll make at request',
            args: [{
                key: 'tag',
                prompt: 'Provide me a tag to view the corresponding pasta!',
                type: 'string',
                validate: tag => {
                    if (pasta[tag.toLowerCase()]) return true;
                    return 'Invalid pasta!';
                },
                parse: tag => tag.toLowerCase()
            }]
        });
    }

    run(message, args) {
        const { tag } = args;
        return message.channel.send(pasta[tag]);
    }
};