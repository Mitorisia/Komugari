const { Command } = require('../../commando');
const Discord = require('discord.js');
const moment = require('moment')
const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
const explicitContentFilters = ['None', 'Scan messages from those without a role', 'Scan all messages']


module.exports = class ServerCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'server',
                aliases: ['guild', 'serverinfo'],
                group: 'info',
                memberName: 'server',
                guildOnly: true,
                description: 'Shows some in-depth description for your server!',
                examples: ['~server'],
                throttling: {
                    usages: 1,
                    duration: 5
                }
            });
        }

        run(message) {
                const textChannels = message.guild.channels.filter(c => c.type === 'text');
                const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');

                var online = message.guild.members.filter(m => m.user.presence.status === "online").size
                var bots = message.guild.members.filter(m => m.user.bot).size

                var highestRole = message.guild.roles.sort((a, b) => a.position - b.position).map(role => role.toString()).slice(1).reverse()[0]

                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`Server infomation for **${message.guild.name}**`)
                    .setColor('#846B86')
                    .setThumbnail(message.guild.iconURL())
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                    .addField('❯\u2000\Information', `•\u2000\**ID:** ${message.guild.id}\n\•\u2000\**${message.guild.owner ? 'Owner' : 'Owner ID'}:** ${message.guild.owner ? `${message.guild.owner.user} (${message.guild.owner.id})` : message.guild.ownerID}\n\•\u2000\**Created:** ${moment(message.guild.createdAt).format('MMMM Do YYYY')} \`(${fromNow(message.guild.createdAt)})\`\n\•\u2000\**Region:** ${message.guild.region}\n\•\u2000\**Verification:** ${verificationLevels[message.guild.verificationLevel]}\n\•\u2000\**Content Filter:** ${explicitContentFilters[message.guild.explicitContentFilter]}`)
            .addField('❯\u2000\Quantitative Statistics', `•\u2000\**Channels** [${message.guild.channels.size}]: ${textChannels.size} text - ${voiceChannels.size} voice\n\•\u2000\**Members** [${message.guild.memberCount}]: ${online} online - ${bots} bots\n\•\u2000\**Roles** [${message.guild.roles.size}]: say \`~roles\` to see all roles`, true)
            .addField('❯\u2000\Miscellaneous', `•\u2000\**Highest Role:** ${highestRole}\n\•\u2000\**Emojis:** ${message.guild.emojis.size}\n\u2000\u2000\↳ Say *~emojis*!`, true)            
        return message.channel.send({embed});
	}
}

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