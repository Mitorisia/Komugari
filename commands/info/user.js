const { Command } = require('../../commando');
const Discord = require('discord.js');
const moment = require('moment');
const perms = require('../../assets/json/permissions');


module.exports = class UserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'user',
            aliases: ['info', 'userinfo', 'member', 'whois', 'profile'],
            group: 'info',
            memberName: 'user',
            guildOnly: true,
            description: 'Shows details about a user!',
            examples: ['~user <mention>'],
            args: [{
                key: 'member',
                prompt: 'Which user would you like to get info on?',
                type: 'member',
                default: ''
            }]
        });
    }

    run(message, args) {
        const member = args.member || message.member;

        const status = member.user.presence.activity ? (member.user.presence.activity.type ? 'Playing' : 'Playing') + ` **${member.user.presence.activity.name}**` : `*${member.user === this.client.user ? 'I am' : 'This user is'} not playing/streaming anything!*`;

        if (member.user.bot) {
            var author = member.user.tag + ' [BOT]'
        } else {
            var author = member.user.tag
        }

        if (!member.nickname) {
            var nickname = 'N/A'
        } else {
            var nickname = member.nickname
        }

        const allowed = Object.entries(member.permissions.serialize()).filter(([perm, allowed]) => allowed).map(([perm]) => perms[perm]).join(', ');

        const roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => {
            return role.name
        })

        const embed = new Discord.MessageEmbed()
            .setAuthor(author, member.user.displayAvatarURL({ format: 'png' }))
            .setDescription(status)
            .setColor(member.displayHexColor)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .addField('❯\u2000\Information', `•\u2000\**ID:** ${member.user.id}\n\•\u2000\**Status:** ${member.user.presence.status ? member.user.presence.status : 'N/A'}\n\•\u2000\**Created:** ${moment(member.user.createdAt).format('MMMM Do YYYY')} \`(${fromNow(member.user.createdAt)})\``)
            .addField('❯\u2000\Server Membership', `•\u2000\**Nickname:** ${nickname}\n\•\u2000\**Joined:** ${moment(member.joinedAt).format('MMMM Do YYYY')} \`(${fromNow(member.joinedAt)})\``, true)
            .addField('❯\u2000\**Role Infomation**', `•\u2000\**Highest Role:** ${member.highestRole.name !== '@everyone' ? member.highestRole.name : 'None'}\n\•\u2000\**Hoist Role:** ${member.hoistRole ? member.hoistRole.name : 'None'}`, true)
            .addField(`❯\u2000\**Roles** [${roles.length}]`, roles.length ? '•\u2000' + roles.join(', ') : '•\u2000\None', true)
            .addField(`❯\u2000\**Permissions**`, allowed ? `•\u2000${allowed}` : '•\u2000\None')
        return message.channel.send(`User information for **${member.user.username}**#${member.user.discriminator}`, { embed: embed });
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