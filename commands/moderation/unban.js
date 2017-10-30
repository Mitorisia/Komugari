const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class UnBanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            group: 'moderation',
            memberName: 'unban',
            description: 'Unbans the given member!',
            examples: ['~unban [member] [reason]'],
            clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: 'Please provide me a member to unban!',
                    type: 'user'
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

        const { member, reason } = args;
        this.client.users.fetch(member.id).then(async usr => {
            const bans = await message.guild.fetchBans();
            if (!bans.has(usr.id)) return message.channel.send('This user is not banned!');
            
            await message.channel.send(`Are you sure you want to unban **${usr.tag}**? \`\`(y/n)\`\``);
            const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
                max: 1,
                time: 30000
            });
    
            if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
            if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')
            
            await message.guild.unban(member.id, {
                reason: `${message.author.tag}: ${reason}`
            });
            return await message.channel.send(`Successfully unbanned **${usr.tag}**! 👋`);
        })
    };    
}