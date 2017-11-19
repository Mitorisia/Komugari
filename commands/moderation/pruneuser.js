const { Command } = require('../../commando');

module.exports = class PruneUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pruneuser',
            guildOnly: true,
            aliases: ['pruneu', 'pu'],
            group: 'moderation',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
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
                type: 'user'
            },
            {
                key: 'count',
                label: 'messages to be pruned',
                prompt: 'Please provide me a set number of messages to prune!',
                type: 'integer',
            },]
        });
    }

    async run(message, args) {
        const { user, count } = args;

        try {
            const messages = await message.channel.messages.fetch({
                limit: count,
                before: message.id
            })
            const flushable = messages.filter(m => m.author.id == user.id)
            if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, **${user.username}** did not send any messages in the last ${count} messages!`);

             await message.channel.bulkDelete(flushable)
            const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? `message from **${user.username}**!` : `messages from **${user.username}**!`}`);

            return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');
        }
    }
}