const { Command } = require('../../commando');
const Discord = require('discord.js');

const ImageRegex = /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/gi;

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
            examples: ['~prune [1-100] <all/images/bots/codeblocks/attachments/embeds/me>'],
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
                    key: 'type',
                    label: 'type of messages pruned',
                    prompt: 'Please provide me a valid type of message to prune!',
                    type: 'string',
                    default: "all",
                    validate: base => {
                        if (['all', 'images', 'pics', 'image', 'bots', 'bot', 'codeblocks', 'code', 'attachments', 'attachment', 'files', 'file', 'embeds', 'embed', 'me'].includes(base.toLowerCase())) return true;
                        return 'Please enter a valid type of message! `all` `images` `bots` `codeblocks` `embeds`';
                    },
                }
            ]
        });
    }

    async run(message, args) {
        const { count, type } = args;

        if (type == 'all') {
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'message!' : 'messages!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'images' || type == 'pics' || type == 'image') {
            try {
                const messages = await message.channel.fetchMessages({
                    limit: Math.min(count, 100),
                    before: message.id
                })
                const flushable = messages.filter(m => m.attachments.filter(a => a.height).length > 0 || ImageRegex.test(m.content))
                await Promise.all(flushable.map(m => m.bulkDelete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? 'image!' : 'images!'}`);

                return null;
            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }

        }

        if (type == 'bots' || type == 'bot') {
            try {
                const messages = await message.channel.fetchMessages({
                    limit: Math.min(count, 100),
                    before: message.id
                })
                const flushable = messages.filter(m => m.author.bot)
                await Promise.all(flushable.map(m => m.bulkDelete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? 'bot message!' : 'bot messages!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'codeblocks' || type == 'code') {
            try {
                const messages = await message.channel.fetchMessages({
                    limit: Math.min(count, 100),
                    before: message.id
                })
                const flushable = messages.filter(m => m.content.startsWith('```'));
                await Promise.all(flushable.map(m => m.bulkDelete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? 'codeblock!' : 'codeblocks!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'attachments' || type == 'attachment' || type == 'files' || type == 'file') {
            try {
                const messages = await message.channel.fetchMessages({
                    limit: Math.min(count, 100),
                    before: message.id
                })
                const flushable = messages.filter(m => m.attachments.length > 0)
                await Promise.all(flushable.map(m => m.bulkDelete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? 'attachment!' : 'attachments!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'embeds' || type == 'embed') {
            try {
                const messages = await message.channel.fetchMessages({
                    limit: Math.min(count, 100),
                    before: message.id
                })
                const flushable = messages.filter(m => m.embeds.length > 0)
                await Promise.all(flushable.map(m => m.bulkDelete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} ${flushable.size == 1 ? 'embed!' : 'embeds!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'me') {
            try {
                const messages = await message.channel.fetchMessages({
                    limit: Math.min(count, 100),
                    before: message.id
                })
                const flushable = messages.filter(m => m.id == message.author.id)
                await Promise.all(flushable.map(m => m.bulkDelete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${flushable.size} of your messages!`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }
    }
};