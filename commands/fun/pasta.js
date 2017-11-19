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
            examples: ['~pasta [tag]'],
            description: 'Cool custom pastas that I\'ll make at request',
            args: [{
                key: 'tag',
                prompt: 'Provide me a tag to view the corresponding pasta!',
                type: 'string',
                validate: tag => {
                    if (pasta[tag.toLowerCase()]) return true;
                    return 'Invalid pasta! This is equivalent to an easter egg command that only the creator has full knowledge of!\nAsk around the support server or send a pasta through the `~support` command!';
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