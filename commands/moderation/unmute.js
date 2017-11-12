const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class UnMuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            aliases: ['undeafen', 'speakup'],
            group: 'moderation',
            memberName: 'unmute',
            guildOnly: true,
            clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            description: 'Unmutes the given user in this channel!',
            examples: ['~unmute [user]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                key: 'member',
                prompt: 'Please provide me a user to unmute!',
                type: 'member'
            }]
        });
    }

    async run(message, args) {
        const { member } = args;

        if (member.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
            return message.channel.send(`❎ | You can't unmute **${member.user.username}**! Their position is higher than you!`);
        }
        if (!member.bannable) return message.channel.send(`❎ | I can't unmute **${member.user.username}**! Their role is higher than mine!`);

        await message.channel.send(`Are you sure you want to unmute **${member.user.tag}** in **${message.channel.name}**? \`\`(y/n)\`\``);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')

        try {
            await message.channel.overwritePermissions(member, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true
            })
        } catch (err) {
            await message.channel.send(`<:CANCELLEDLMFAO:372188144059285505> | **${message.author.username}**, there was an error trying to unmute **${member}**! \`${err}\``);
        }

        return await message.channel.send(`**${message.author.username}**, successfully unmuted ${member.user.tag} in **${message.channel.name}**! 🙊`);

    }
}