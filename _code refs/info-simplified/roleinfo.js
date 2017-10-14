const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const perms = require('../../assets/json/permissions');

module.exports = class RoleInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'role-info',
			aliases: ['role'],
			group: 'guild-info',
			memberName: 'role-info',
			description: 'Responds with detailed information on a role.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'role',
					prompt: 'Which role would you like to get info on?',
					type: 'role'
				}
			]
		});
	}

	run(msg, args) {
		const { role } = args;
		const embed = new MessageEmbed()
			.setColor(role.hexColor)
			.addField('❯ Name',
				role.name, true)
			.addField('❯ ID',
				role.id, true)
			.addField('❯ Color',
				role.hexColor.toUpperCase(), true)
			.addField('❯ Creation Date',
				moment(role.createdAt).format('MMMM Do YYYY'), true)
			.addField('❯ Hoisted',
				role.hoist ? 'Yes' : 'No', true)
			.addField('❯ Mentionable',
				role.mentionable ? 'Yes' : 'No', true)
			.addField('❯ Permissions',
				Object.keys(perms)
					.filter(perm => role.serialize()[perm])
					.map(perm => perms[perm])
					.join(', '));
		return msg.embed(embed);
	}
};
