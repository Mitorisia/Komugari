const { Command } = require('../../commando');


module.exports = class PruneWordCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'pruneword',
                aliases: ['purgew', 'prunew', 'filter', 'pw'],
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
                            if (count <= 100 && count > 0) return true;
                            return 'Please provide me a valid number between 1 and 100!';
                        }
                    },
                    {
                        key: 'inc',
                        label: 'the word included to be pruned',
                        prompt: 'Please provide me a word or phrase to prune!',
                        type: 'string'
                    }
                ]
            });
        }

        async run(message, args) {
                const { count, inc } = args;

                try {
                    const messages = await message.channel.messages.fetch({
                        limit: Math.min(count, 100),
                        before: message.id
                    })
                    const flushable = messages.filter(m => m.content.toLowerCase().includes(inc))
                    if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no messages containing the word **${inc}** in the last ${count} messages!`);
                    await message.channel.bulkDelete(flushable)

                    const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? `message containing the word **${inc}**!` : `messages containing the word **${inc}**!`}`);

            return null;
        } catch (err) {
            console.log(err)
            return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

        }
    }
};