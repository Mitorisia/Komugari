const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class PruneUserCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'pruneuser',
                guildOnly: true,
                aliases: ['pruneu', 'pu'],
                group: 'moderation',
                memberName: 'pruneuser',
                description: 'Prunes a specified number of messaged from a specific user!',
                examples: ['~prune [user] [count]'],
                throttling: {
                    usages: 1,
                    duration: 10
                },
                args: [{
                        key: 'user',
                        label: 'which user to prune',
                        prompt: 'Please provide me a user to prune!',
                        type: 'user',
                        default: message.author
                    },
                    {
                        key: 'count',
                        label: 'messages to be pruned',
                        prompt: 'Please provide me a set number of messages to prune!',
                        type: 'integer',
                        validate: count => {
                            if (count < 100 && count > 0) return true;
                            return 'I can\'t delete more than 100 messages at once!';
                        }
                    },
                ]
            });
        }

        async run(message) {
                const { user, count } = args;

                try {
                    const messages = await message.channel.fetchMessages({
                        limit: Math.min(count, 100),
                        before: message.id
                    })
                    const flushable = messages.filter(m => m.author.id == user.id)
                    await Promise.all(flushable.map(m => m.bulkDelete()))
                    const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? `message from **${user.username}**!` : `messages from **${user.username}**!`}`);

            return null;

        } catch (err) {
            console.log(err)
            return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

        }
    }
}