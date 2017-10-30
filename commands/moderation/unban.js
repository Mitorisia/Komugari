const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class UnBanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            group: 'moderation',
            memberName: 'unban',
            description: 'Unbans the given member ID!',
            details: 'haa.. it\'d be way too hard to go to the ban list!',
            examples: ['~unban [member] [reason]'],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            guildOnly: true,
            args: [{
                    key: 'id',
                    prompt: 'Please provide me a user ID to unban!',
                    type: 'string',
                    validate: member => {
                        if (/[0-9]+$/g.test(member) && member.length === 18) return true;
                        return 'Invalid user ID!';
                    }
                },
                {
                    key: 'content',
                    prompt: 'Please provide me the reason for the unban!',
                    type: 'string',
                    validate: reason => {
                        if (reason.length < 140) return true;
                        return 'Reason must be under 140 characters.';
                    }
                }
            ]
        });
    }

    async run(message, args) {

        const { id, reason } = args;
        const bans = await message.guild.fetchBans();
        if (!bans.has(id)) return message.channel.send('This user is not banned in this server!')
        const member = bans.get(id).user;

        await message.channel.send(`Are you sure you want to unban **${member.tag}** \`(y/n)\`?`);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });

        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return msg.say('Aborting.');

        await message.guild.unban(member, `${message.author.tag}: ${reason}`);

        return await message.channel.send(`Successfully unbanned **${member.tag}**! 👋`);
    };
}