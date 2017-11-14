const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class KaomojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kaomoji',
            guildOnly: true,
            aliases: ['lenny', 'face', 'emoticon'],
            group: 'fun',
            memberName: 'kaomoji',
            description: 'Displays a random kaomoji! (´・ω・｀)',
            examples: ['~kaomoji <emotion>'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'emotion',
                prompt: 'Please enter a valid kaomoji emotion!',
                type: 'string',
                default: 'random',
                validate: emotion => {
                    if (['happy', 'sad'].includes(emotion.toLowerCase())) return true;
                    return 'Please enter either start or stop.';
                },
                parse: emotion => emotion.toLowerCase()
            }]
        });
    }

    run(message, args) {
        const { emotion } = args;

        if (emotion == 'random') {

        }

    }
}