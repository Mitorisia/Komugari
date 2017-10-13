const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { filterTopics, parseTopic } = require('../../structures/Util');

module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			aliases: ['banne'],
			group: 'moderation',
			memberName: 'ban',
			description: 'Bans a user and logs the ban to the mod logs.',
			guildOnly: true,
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			args: [
				{
					key: 'member',
					prompt: 'What member do you want to ban?',
					type: 'member'
				},
				{
					key: 'reason',
					prompt: 'What do you want to set the reason as?',
					type: 'string',
					validate: reason => {
						if (reason.length < 140) return true;
						return 'Reason must be under 140 characters.';
					}
				}
			]
		});
	}

	async run(msg, args) {
		const modlogs = filterTopics(msg.guild.channels, 'modlog').first();
		const { member, reason } = args;
		if (member.id === msg.author.id) return msg.say('I don\'t think you want to ban yourself...');
		if (!member.bannable) return msg.say('This member is not bannable. Perhaps they have a higher role than me?');
		if (member.highestRole.calculatedPosition > msg.member.highestRole.calculatedPosition - 1) {
			return msg.say('Your roles are too low to ban this member.');
		}
		await msg.say(`Are you sure you want to ban ${member.user.tag} (${member.id})?`);
		const msgs = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
			max: 1,
			time: 30000
		});
		if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return msg.say('Aborting.');
		try {
			const message = parseTopic(modlogs.topic, 'modmessage')
				.replace(/{{action}}/gi, 'banned')
				.replace(/{{moderator}}/gi, msg.author.tag)
				.replace(/{{server}}/gi, msg.guild.name);
			await member.send(stripIndents`
				${message || `You were banned from ${msg.guild.name} by ${msg.author.tag}!`}
				**Reason:** ${reason}
			`);
		} catch (err) {
			await msg.say('Failed to Send DM.');
		}
		await member.ban({
			days: 7,
			reason: `${msg.author.tag}: ${reason}`
		});
		await msg.say(`Successfully banned ${member.user.tag}.`);
		if (!modlogs) {
			return msg.say('Could not log the ban to the mod logs.');
		} else if (modlogs.permissionsFor(this.client.user).has('EMBED_LINKS')) {
			const embed = new MessageEmbed()
				.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ format: 'png' }))
				.setColor(0xFF0000)
				.setTimestamp()
				.setDescription(stripIndents`
					**Member:** ${member.user.tag} (${member.id})
					**Action:** Ban
					**Reason:** ${reason}
				`);
			return modlogs.send({ embed });
		} else {
			return modlogs.send(stripIndents`
				**Member:** ${member.user.tag} (${member.id})
				**Action:** Ban
				**Reason:** ${reason}
				**Moderator:** ${msg.author.tag}
			`);
		}
	}
};
