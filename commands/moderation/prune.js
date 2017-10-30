const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class PruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            aliases: ['purge', 'bulkdelete', 'delete', 'flush'],
            group: 'moderation',
            memberName: 'prune',
            description: 'Deletes up to 99 messages from the current channel.',
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: 'count',
                label: 'amount of messages',
                prompt: 'How many messages do you want to delete? Limit of up to 99.',
                type: 'integer',
                validate: count => {
                    if (count < 100 && count > 0) return true;
                    return 'I can\'t delete more than 100 messages at once!';
                }
            }, ]
        });
    }

    async run(message, args) {
        const { count } = args;

        try {
            const messages = await message.channel.messages.fetch({ limit: count });
            await message.channel.bulkDelete(messages.size, true);
            return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'message!' : 'messages!'}`)

        } catch (err) {
            console.log(err)
            return message.channel.send('These messages are too old to be deleted! I can only delete messages within two weeks!');
        }
    }
};