const { Command } = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const statuses = require('../../assets/json/user-info');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'user-info',
			aliases: ['user', 'member', 'member-info'],
			group: 'user-info',
			memberName: 'user',
			description: 'Responds with detailed information on a user.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'member',
					prompt: 'Which user would you like to get info on?',
					type: 'member',
					default: ''
				}
			]
		});
	}

	run(msg, args) {
		const member = args.member || msg.member;
		const status = member.user.presence.status;
		const embed = new MessageEmbed()
			.setColor(member.displayHexColor)
			.setThumbnail(member.user.displayAvatarURL())
			.addField('❯ Name',
				member.user.tag, true)
			.addField('❯ ID',
				member.id, true)
			.addField('❯ Discord Join Date',
				moment(member.user.createdAt).format('MMMM Do YYYY'), true)
			.addField('❯ Server Join Date',
				moment(member.joinedTimestamp).format('MMMM Do YYYY'), true)
			.addField('❯ Status',
				statuses[status], true)
			.addField('❯ Playing',
				member.user.presence.game ? member.user.presence.game.name : 'N/A', true)
			.addField('❯ Highest Role',
				member.highestRole.name !== '@everyone' ? member.highestRole.name : 'None', true)
			.addField('❯ Hoist Role',
				member.hoistRole ? member.hoistRole.name : 'None', true);
		return msg.embed(embed);
	}
};
