const { Command } = require('../../commando');

module.exports = class DelRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'delrole',
            group: 'moderation',
            aliases: ['rmrole', 'deleterole', 'remrole', 'drole', 'dr'],
            memberName: 'delrole',
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['MANAGE_ROLES'],
            description: 'Removed a role from a member!',
            examples: ['~delrole [name] [role]'],
            guildOnly: true,
            args: [{
                    key: 'member',
                    prompt: 'Please provide me a member to remove the role from!',
                    type: 'member'
                },
                {
                    key: 'role',
                    prompt: 'Please provide me a role to remove!',
                    type: 'role'
                }
            ]
        });
    }

    async run(message, args) {
        const { member, role } = args;
        if (!member.roles.has(role.id)) return message.channel.send(`❎ | **${member.displayName}** does not have have the role **${role.name}**!`)


        try {
            await member.removeRole(role)
            return message.channel.send(`✅ | **${member.displayName}** no longer has the role **${role.name}**!`);
        } catch (err) {
            return message.channel.send(`❎ | **${member.displayName}** does not have the ${role.name} role!`)
        }
    };
};