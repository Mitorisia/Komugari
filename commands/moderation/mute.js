const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['deafen', 'shutup', 'silent', 'shh', 'shut'],
            group: 'moderation',
            memberName: 'mute',
            guildOnly: true,
            clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            description: 'Mutes the given user in this channel!',
            examples: ['~mute [user]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                    key: 'member',
                    prompt: 'Please provide me a user to mute!',
                    type: 'member'
                }
            ]
        });
    }

    async run(message, args) {
        const { member } = args;

        if (member.id === this.client.user.id) return message.channel.send('Please don\'t mute me...!');
        if (member.id === message.author.id) return message.channel.send('I wouldn\'t dare mute you...!');
        if (member.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
            return message.channel.send(`❎ | You can't mute **${member.user.username}**! Their position is higher than you!`);
        }
        if (!member.bannable) return message.channel.send(`❎ | I can't mute **${member.user.username}**! Their role is higher than mine!`);

        await message.channel.send(`Are you sure you want to mute **${member.user.tag}** in **${message.channel.name}**? \`\`(y/n)\`\``);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')

        try {
            await message.channel.overwritePermissions(member, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
        } catch (err) {
            await message.channel.send(`<:CANCELLEDLMFAO:372188144059285505> | **${message.author.username}**, there was an error trying to mute **${member}**! \`${err}\``);
        }

        return await message.channel.send(`**${message.author.username}**, successfully muted **${member.user.tag}** in **${message.channel.name}**! 🙊`);

    }
}