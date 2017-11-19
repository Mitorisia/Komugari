const { Command } = require('../../commando');

const ImageRegex = /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/gi;

module.exports = class DeleteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            aliases: ['slowprune', 'sd', 'delet', 'slowdelete'],
            group: 'moderation',
            memberName: 'delete',
            description: 'Deletes up to 99 messages from the current channel the slow way!',
            details: 'Even if the messages are over 2 weeks old!',
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            examples: ['~delete [1-100] <all/images/bots/codeblocks/attachments/embeds/me>'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                    key: 'count',
                    label: 'messages to be deleted',
                    prompt: 'Please provide me a set number of messages to prune!',
                    type: 'integer',
                    validate: count => {
                        if (count < 100 && count > 0) return true;
                        return 'I can\'t delete more than 99 messages at once!';
                    }
                },
                {
                    key: 'type',
                    label: 'type of messages deleted',
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
                await Promise.all(messages.map(m => m.delete()))
                return message.channel.send(`🍇 | **${message.author.username}**, successfully deleted ${messages.size} ${messages.size == 1 ? 'message!' : 'messages!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'images' || type == 'pics' || type == 'image') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })

                const attachments = messages.filter(m => ImageRegex.test(m.content))
                const urls = messages.filter(m => m.attachments.size > 0)

                const flushable = attachments.concat(urls)

                await Promise.all(flushable.map(m => m.delete()))
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no images to prune in the last ${count} messages!`);

                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully deleted **${flushable.size}** ${flushable.size == 1 ? 'image!' : 'images!'}`);

                return null;
            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }

        }

        if (type == 'bots' || type == 'bot') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.author.bot)
                await Promise.all(flushable.map(m => m.delete()))
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no bot messages to prune in the last ${count} messages!`)

                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully deleted **${flushable.size}** ${flushable.size == 1 ? 'bot message!' : 'bot messages!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'codeblocks' || type == 'code') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.content.startsWith('```'));
                await Promise.all(flushable.map(m => m.delete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully deleted **${flushable.size}** ${flushable.size == 1 ? 'codeblock!' : 'codeblocks!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'attachments' || type == 'attachment' || type == 'files' || type == 'file') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.attachments.length > 0)
                await Promise.all(flushable.map(m => m.delete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully deleted **${flushable.size}** ${flushable.size == 1 ? 'attachment!' : 'attachments!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'embeds' || type == 'embed') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.embeds.length > 0)
                await Promise.all(flushable.map(m => m.delete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully deleted **${flushable.size}** ${flushable.size == 1 ? 'embed!' : 'embeds!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'me') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => m.id == message.author.id)
                await Promise.all(flushable.map(m => m.delete()))
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully deleted **${flushable.size}** of your messages!`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }
    }
};