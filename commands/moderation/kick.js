const { Command } = require('../../commando');


module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            guildOnly: true,
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            description: 'Kicks the given user and DMs them the reason!',
            examples: ['~kick [user] [reason]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                    key: 'member',
                    prompt: 'Please provide me a user to kick!',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Please provide me a reason to kick this member!',
                    type: 'string',
                    default: 'none',                    
                    validate: reason => {
                        if (reason.length < 140) return true;
                        return 'Reason must be under 140 characters!';
                    }
                }
            ]
        });
    }

    async run(message, args) {
        const { member, reason } = args;

        if (member.id === this.client.user.id) return message.channel.send('Please don\'t kick me...!');
        if (member.id === message.author.id) return message.channel.send('I wouldn\'t dare kick you...!');
        if (member.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) return message.channel.send(`❎ | You can't kick **${member.user.username}**! Their position is higher than you!`);
        if (!member.kickable) return message.channel.send(`❎ | I can't kick **${member.user.username}**! Their role is higher than mine!`);

        await message.channel.send(`Are you sure you want to kick **${member.user.tag}**? \`(y/n)\``);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });
        
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')

        try {
            await member.send(`You were kicked from **${message.guild.name}** by **${message.author.tag}**!\n\**Reason:** ${reason}`);
        } catch (err) {
            await message.channel.send(`❎ | **${message.author.username}**, failed to Send DM to **${member}**! \`${err}\``);
        }

        await member.kick(`${message.author.tag}: ${reason}`);
        return message.channel.send(`**${message.author.username}**, successfully kicked **${member.user.tag}**! 👋`);

    }
}