const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class LeaveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            aliases: ['stop'],
            group: 'music',
            guildOnly: true,
            memberName: 'leave',
            description: 'Leaves the voice chat!',
            examples: ['~leave'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run(message) {
        if (!message.channel.permissionsFor(message.member).has('MANAGE_MESSAGES')) {
            return message.channel.send('You can\'t use this command! It requires the `manage messages` permission!')
        }

        if (!message.guild.voiceConnection) {
            return message.channel.send(`I'm not in a voice channel!`);
        } else if (message.guild.voiceConnection) {
            await message.guild.voiceConnection.channel.leave();
            return message.channel.send(`Left the channel **${message.member.voiceChannel.name}** at **${message.author.username}**'s request!`);
        }
    }
}