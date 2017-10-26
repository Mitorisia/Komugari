const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            aliases: ['stats', 'botstats'],
            group: 'owner',
            memberName: 'botinfo',
            description: 'Shows some information about the running instance!',
            examples: ['~botinfo'],
        });
    }

    hasPermission (message) {
		return this.client.isOwner(message.author);
    }
    
    run (message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Komugari v0.6', this.client.displayAvatarURL())
            .setThumbnail(this.client.displayAvatarURL())
            .setColor('#846B86')
            .addField('❯\u2000\Information', `•\u2000\**Servers:** ${this.client.guilds.size}\n\•\u2000\**Users:** ${this.client.users.size}\n\•\u2000\**Voice:** ${moment(channel.createdAt).format('MMMM Do YYYY')} (${fromNow(channel.createdAt)})`, true)
            .addField('❯\u2000\Miscellaneous', `•\u2000\**NSFW:** ${channel.nsfw ? "Yes" : "No"}\n\•\u2000\**Matching Permissions:** ${channel.permissionsLocked ? "Yes" : "No"}`, true)
        return message.channel.send({embed});
	}
}