const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class HowToCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'howto',
            guildOnly: true,
            aliases: ['ht', 'howtonsfw', 'nsfwchannel', 'setnsfw', 'toggle'],
            group: 'core',
            memberName: 'howto',
            clientPermissions: ['MANAGE_CHANNELS'],
            description: 'Tells you how to set a channel into an NSFW one!',
            details: 'Optionally have me set it for you!',
            examples: ['~howto'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(message) {
        if (message.channel.nsfw) return message.channel.send('Looks like you\'ve got it all set up already! An NSFW channel perfect for...lewding? Try `~nsfwcommands` to see what I can do!')
        message.channel.send(`__**Here's how to set a channel into NSFW!**__\n\**1)** Click the __channel settings cog__ beside the channel name!\n\**2)** Click the __NSFW switch__ right under the channel topic box!\n\**3)** You're done! Save the settings and an NSFW channel all set up for you!\n\https://b.catgirlsare.sexy/i6CE.png\n\**Would you like me to make this channel NSFW for you?** \`(y/n)\``);

        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')

        if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.channel.send('Hold on..you don\'t have the permissions to do this! @A@ beanboozled aagain...');

        try {
            await message.channel.setNSFW(true, `set by ${message.author.tag}`);
        } catch (err) {
            await message.channel.send(`<:CANCELLEDLMFAO:372188144059285505> | **${message.author.username}**, there was an error trying to make this channel into an NSFW channel! \`${err}\``);
        }

        return await message.channel.send(`✅ | **${message.author.username}**, successfully made **${message.channel.name}** into an NSFW channel!`);
    }
}