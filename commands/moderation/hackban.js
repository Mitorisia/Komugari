const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hackban',
            group: 'moderation',
            memberName: 'hackban',
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
            description: 'Bans the given user ID, even if they\'re not in the server!',
            examples: ['~softban [userID] [reason]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [
				{
					key: 'member',
					prompt: 'Please provide me a user ID to hackban!',
                    type: 'string',
                    validate: member => {
						if (/[0-9]+$/g.test(member) && member.length === 18) return true;
						return 'Invalid user ID!';
					}
				},
				{
					key: 'reason',
					prompt: 'Please provide me a reason to hackban this user!',
					type: 'string',
					validate: reason => {
						if (reason.length < 140) return true;
						return 'Reason must be under 140 characters!';
					}
				}
			]
        });
    }

    async run (message, args) {
        const { member, reason } = args;

        if (member === this.client.user.id) return message.channel.send('Please don\'t hackban me...!');
        if (member === message.author.id) return message.channel.send('I wouldn\'t dare hackban you...!');
        
        await message.channel.send(`Are you sure you want to hackban \`${member}\`? \`\`(y/n)\`\``);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
			max: 1,
			time: 30000
        });

        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')
        
		await message.guild.ban(member, {
			reason: `${message.author.tag}: ${reason}`
		});
		await message.channel.send(`Successfully banned \`${member}\`! 👋`);
        
	}
}
