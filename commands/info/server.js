const { Command } = require('../../commando');
const Discord = require('discord.js');
const moment = require('moment');
const { fromNow } =  require('../../commando/util');
const verificationLevels = ['`None`', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];
const explicitContentFilters = ['`None`', 'Scan messages from those without a role', 'Scan all messages'];


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
            },
            args: [{
                key: 'id',
                prompt: 'Please provide me a server ID to get the information of!',
                type: 'string',
                default: 'this'
            }]
        });
    }

    run(message, args) {
        let guild;

        if(!this.client.isOwner(message.author)) {
            guild = message.guild;
        } else if(args.id == 'this') {
            guild = message.guild;
        } else if (!/^[0-9]+$/.test(args.id)) {
            guild = message.guild;
        } else {
            try {
                guild = this.client.guilds.get(args.id);

                if (guild.channels) {
                    guild = this.client.guilds.get(args.id);
                } else {
                    guild = message.guild
                }

            } catch(err) {
                guild = message.guild;
            }
        }

        const textChannels = guild.channels.filter(c => c.type === 'text');
        const voiceChannels = guild.channels.filter(c => c.type === 'voice');

        var online = guild.members.filter(m => m.user.presence.status === "online").size
        var bots = guild.members.filter(m => m.user.bot).size

        var highestRole = guild.roles.sort((a, b) => a.position - b.position).map(role => role.toString()).slice(1).reverse()[0]

        const embed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setColor('#846B86')
            .setThumbnail(guild.iconURL())
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .addField('❯\u2000\Information', `•\u2000\**ID:** \`${guild.id}\`\n\•\u2000\**${guild.owner ? 'Owner' : 'Owner ID'}:** ${guild.owner ? `${guild.owner.user.tag} \`(${guild.owner.id})\`` : guild.ownerID}\n\•\u2000\**Created:** ${moment(guild.createdAt).format('MMMM Do YYYY')} \`(${fromNow(guild.createdAt)})\`\n\•\u2000\**Region:** ${guild.region}\n\•\u2000\**Verification:** ${verificationLevels[guild.verificationLevel]}\n\•\u2000\**Content Filter:** ${explicitContentFilters[guild.explicitContentFilter]}`)
            .addField('❯\u2000\Quantitative Statistics', `•\u2000\**Channels** [${guild.channels.size}]: ${textChannels.size} text - ${voiceChannels.size} voice\n\•\u2000\**Members** [${guild.memberCount}]: ${online} online - ${bots} bots\n\•\u2000\**Roles** [${guild.roles.size}]: say \`~roles\` to see all roles`, true)
            .addField('❯\u2000\Miscellaneous', `•\u2000\**Highest Role:** ${highestRole}\n\•\u2000\**Emojis:** ${guild.emojis.size}\n\u2000\u2000\↳ Say *~emojis*!`, true)            
        return message.channel.send({embed});
	}
}