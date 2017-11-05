const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class PruneWordCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'pruneword',
                aliases: ['purgew', 'prunew', 'filter'],
                group: 'moderation',
                memberName: 'pruneword',
                description: 'Deletes up to 99 messages containing a specific phrase!',
                details: 'The word in the command must be all lowercase!',
                guildOnly: true,
                clientPermissions: ['MANAGE_MESSAGES'],
                userPermissions: ['MANAGE_MESSAGES'],
                examples: ['~prune [1-100] [word/phrase]'],
                throttling: {
                    usages: 1,
                    duration: 10
                },
                args: [{
                        key: 'count',
                        label: 'messages to be pruned',
                        prompt: 'Please provide me a set number of messages to prune!',
                        type: 'integer',
                        validate: count => {
                            if (count < 100 && count > 0) return true;
                            return 'I can\'t delete more than 100 messages at once!';
                        }
                    },
                    {
                        key: 'includes',
                        label: 'the word included to be pruned',
                        prompt: 'Please provide me a word or phrase to prune!',
                        type: 'string',
                        default: "all"
                    }
                ]
            });
        }

        async run(message, args) {
                const { type, inc } = args;

                try {
                    const messages = await message.channel.fetchMessages({
                        limit: Math.min(count, 100),
                        before: message.id
                    })
                    const flushable = messages.filter(m => m.content.toLowerCase().includes(inc))
                    await Promise.all(flushable.map(m => m.bulkDelete()))
                    const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? `message containing the word **${inc}**!` : `messages containing the word **${inc}**`}`);

            return null;
        } catch (err) {
            console.log(err)
            return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

        }
    }
};