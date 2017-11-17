const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class MassAddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'massadd',
            guildOnly: true,
            aliases: ['ma', 'addroleall', 'roleall'],
            group: 'moderation',
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            memberName: 'massadd',
            description: 'Adds the role to everyone on the server!',
            details: 'Why..would you want to do that!!! Also this command will take a long time...',
            examples: ['~massadd [role]'],
            throttling: {
                usages: 1,
                duration: 60
            },
            args: [{
                key: 'role',
                prompt: 'Please provide me a role to add!',
                type: 'role'
            }]
        });
    }

    async run(message, args) {
        const { role } = args;
        const members = await message.guild.members.fetch()
        const msg = await message.channel.send(`🔄 | Adding the **${role.name}** role to **${members.size}** members...this might take a while...`)
        await members.forEach(m => m.addRole(role))

        msg.delete()
    }
}