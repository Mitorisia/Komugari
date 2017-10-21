const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment')
const perms = require('../../assets/json/permissions');


module.exports = class RoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'role',
            aliases: ['roleinfo', 'roles'],
            group: 'info',
            memberName: 'role',
            guildOnly: true,
            description: 'Shows detailed description of a role or lists all roles!',
            examples: [''],
            args: [
				{
					key: 'role',
					prompt: 'Please provide me with a role to get the information of!',
					type: 'role',
					default: ''
				}
			]
        });
    }

    run (message, args) {
		let somethingThere = message.content.split(/\s+/g).slice(1).join(" ");

		if(!somethingThere) {
			const embed = new Discord.MessageEmbed()
				.setAuthor(`${message.guild.name}'s Roles`, message.guild.iconURL({format: 'png'}))
				.setColor('#807A8F')
				.setDescription(message.guild.roles.sort((a, b) => a.position - b.position).map(role => role.toString()).slice(1).reverse().join(" "));
			return message.channel.send({embed})
		}
		
		const { role } = args;
		
		function fromNow(date) {
			if (!date) {
				return false;
			  }
			
			  const ms = new Date().getTime() - date.getTime();
			
			  if (ms >= 86400000) {
				const days = Math.floor(ms / 86400000);
				return `${days} day${days !== 1 ? 's' : ''} ago`;
			  }
			
			  return `${this.humanizeDuration(ms, 1, false, false)} ago`;
		} 

		const allowed = Object.entries(role.permissions.serialize()).filter(([perm, allowed]) => allowed).map(([perm]) => perms[perm]).join(', ');

		const embed = new Discord.MessageEmbed()
			.setAuthor(role.name, message.guild.iconURL())
			.setDescription(`**Guild:** ${message.guild.name} (ID: ${message.guild.id})`)
			.setColor(role.hexColor)
			.setThumbnail(message.guild.iconURL())
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
			.addField('❯\u2000\Information', `•\u2000\**ID:** ${role.id}\n\•\u2000\**Created:** ${moment(role.createdAt).format('MMMM Do YYYY')} (${fromNow(role.createdAt)})\n\•\u2000\**Position:** ${message.guild.roles.size - role.position} out of ${message.guild.roles.size}\n\•\u2000\**Members:** ${role.members.size} users`, true)
			.addField('❯\u2000\Miscellaneous', `•\u2000\**Hex Color:** ${role.hexColor}\n\•\u2000\**Hoisted:** ${role.hoist ? 'Yes' : 'No'}\n\•\u2000\**Mentionable:** ${role.mentionable ? 'Yes' : 'No'}\n\•\u2000\**Managed:** ${role.managed ? 'Yes' : 'No'}`, true)
			.addField('❯ Permissions', allowed)
		return message.channel.send(`Information for the role **${role.name}**!`, {embed:embed});
	}
}
