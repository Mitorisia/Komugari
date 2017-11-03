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
            examples: '~prune [all/images/bots/codeblocks/attachments/embeds] [1-100]',
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [
                {
                key: 'type',
                label: 'type of messages pruned',
                prompt: 'Please provide me a valid type of message to prune!',
                type: 'string',
                default: "all",
                validate: base => {
                    if (['all', 'images', 'pics', 'image', 'bots', 'bot', 'codeblocks', 'code', 'attachments', 'attachment', 'files', 'file', 'embeds', 'embed'].includes(base.toLowerCase())) return true;
                    return 'Please enter a valid type of message! `all` `images` `bots` `codeblocks` `embeds`';
                },
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
                }
        ]
        });
    }

    async run(message, args) {
        const { type, count } = args;

        if(type == 'all') { 
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'message!' : 'messages!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('These messages are too old to be deleted! I can only delete messages within two weeks!');
        
            }
        }

        if(type == 'images' || type == 'pics' || type == 'image') {
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'image!' : 'images!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('These messages are too old to be deleted! I can only delete messages within two weeks!');
        
            }
            
        }

        if(type == 'bots' || type == 'bot') {
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'bot message!' : 'bot messages!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('These messages are too old to be deleted! I can only delete messages within two weeks!');
        
            }
        }

        if(type == 'codeblocks' || type == 'code') {
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'codeblock' : 'codeblocks!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('These messages are too old to be deleted! I can only delete messages within two weeks!');
        
            }
        }

        if(type == 'attachments' || type == 'attachment' || type == 'files' || type == 'file') {
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'attachment!' : 'attachments!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('These messages are too old to be deleted! I can only delete messages within two weeks!');
        
            }
        }

        if(type == 'embeds' || type == 'embed') {
            try {
                const messages = await message.channel.messages.fetch({ limit: count });
                await message.channel.bulkDelete(messages.size, true);
                return message.channel.send(`🍇 | **${message.author.username}**, successfully pruned ${messages.size} ${messages.size == 1 ? 'embed!' : 'embeds!'}`)

            } catch (err) {
                console.log(err)
                return message.channel.send('These messages are too old to be deleted! I can only delete messages within two weeks!');
        
            }
        }
    }
};