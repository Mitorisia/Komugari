const { Command } = require('../../commando');

const ImageRegex = /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/gi;
const LinkRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

module.exports = class PruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            aliases: ['purge', 'bulkdelete', 'flush'],
            group: 'moderation',
            memberName: 'prune',
            description: 'Deletes up to 99 messages from the current channel.',
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            examples: ['~prune [1-100] <all/images/links/bots/codeblocks/attachments/embeds/me>'],
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
                        return 'I can\'t delete more than 99 messages at once!';
                    }
                },
                {
                    key: 'type',
                    label: 'type of messages pruned',
                    prompt: 'Please provide me a valid type of message to prune!',
                    type: 'string',
                    default: "all",
                    validate: base => {
                        if (['all', 'images', 'pics', 'image', 'bots', 'bot', 'codeblocks', 'code', 'attachments', 'attachment', 'files', 'file', 'embeds', 'embed', 'me', 'links', 'link'].includes(base.toLowerCase())) return true;
                        return 'Please enter a valid type of message! `all` `images` `links` `attachments` `bots` `codeblocks` `embeds` `me`';
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
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })

                const attachments = messages.filter(m => ImageRegex.test(m.content))
                const urls = messages.filter(m => m.attachments.size > 0)

                const flushable = attachments.concat(urls)

                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no images to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)

                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'image!' : 'images!'}`);

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
                await message.channel.bulkDelete(flushable)
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no bot messages to prune in the last ${count} messages!`)

                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'bot message!' : 'bot messages!'}`);

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

                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no codeblocks to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'codeblock!' : 'codeblocks!'}`);

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
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no attachments to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'attachment!' : 'attachments!'}`);

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
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no embeds to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'embed!' : 'embeds!'}`);

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
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no messages from you to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** of your messages!`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }

        if (type == 'link' || type == 'links') {
            try {
                const messages = await message.channel.messages.fetch({
                    limit: count,
                    before: message.id
                })
                const flushable = messages.filter(m => LinkRegex.test(m.content))
                if (flushable.size == 0) return message.channel.send(`🍇 | **${message.author.username}**, there were no links to prune in the last ${count} messages!`);

                await message.channel.bulkDelete(flushable)
                const m = await message.channel.send(`🍇 | **${message.author.username}**, successfully pruned **${flushable.size}** ${flushable.size == 1 ? 'link!' : 'links!'}`);

                return null;

            } catch (err) {
                console.log(err)
                return message.channel.send('❎ | These messages are too old to be deleted! I can only delete messages within two weeks!');

            }
        }
    }
};