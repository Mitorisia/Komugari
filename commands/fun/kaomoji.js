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
                default: 'random'
            }]
        });
    }

    run(message, args) {
        const { emotion } = args;


    }
}