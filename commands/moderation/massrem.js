const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class MassRemCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'massrem',
            guildOnly: true,
            aliases: ['mr', 'remroleall', 'remroleall'],
            group: 'moderation',
            memberName: 'massrem',
            description: 'Removes the role from everyone on the server!',
            details: 'Why..would you want to do that!!! Also this command will take a long time...',
            examples: ['~massrem [role]'],
            throttling: {
                usages: 1,
                duration: 60
            },
            args: [{
                key: 'role',
                prompt: 'Please provide me a role to remove!',
                type: 'role'
            }]
        });
    }

    async run(message, args) {
        const { role } = args;
        const members = await message.guild.members.fetch()
        await message.channel.send(`🔄 | Removing the **${role.name}** role from **${members.size}** members...this might take a while...`)
        await members.forEach(m => m.removeRole(role))

    }
}