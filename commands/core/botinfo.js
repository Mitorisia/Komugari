const { Command } = require('../../commando');
const Discord = require('discord.js');
const moment = require('moment');
const ostb = require('os-toolbox');
const { version } = require('../../package.json')

module.exports = class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            aliases: ['stats', 'botstats'],
            group: 'core',
            memberName: 'botinfo',
            description: 'Shows some information about the running instance!',
            examples: ['~botinfo'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run(message) {
        const timestamp = new Date().getTime()
        const msg = await message.channel.send(`Fetching bot stats...`)
        const ping = new Date().getTime() - timestamp

        const cpuLoad = await ostb.cpuLoad();
        const memoryUsage = await ostb.memoryUsage();

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Komugari v${version}`, this.client.user.displayAvatarURL())
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('#6C70EB')
            .addField('❯\u2000\System', `•\u2000\**Ping:** ${ping}ms\n\•\u2000\**CPU Load:** ${cpuLoad}%\n\•\u2000\**Memory Usage:** ${memoryUsage}%\n\•\u2000\**Heap:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField('❯\u2000\Presence', `•\u2000\**Servers:** ${this.client.guilds.size}\n\•\u2000\**Users:** ${this.client.users.size}\n\•\u2000\**Voice Channels:** ${this.client.voiceConnections.size}`, true)
            .addField('❯\u2000\Miscellaneous', `•\u2000\**Created:** ${moment(this.client.user.createdAt).format('MMMM Do YYYY')} \`(${fromNow(this.client.user.createdAt)})\`\n\•\u2000\**Uptime:** ${humanizeDuration(this.client.uptime, 3, true)}`, true)
        return msg.edit('🈯 **Here\'s my current info!**', { embed: embed });
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

function humanizeDuration(ms, maxUnits, short = false, fraction = true) {
    const round = ms > 0 ? Math.floor : Math.ceil
    const parsed = [{
            int: round(ms / 604800000),
            sin: 'week',
            plu: 'weeks',
            sho: 'w'
        },
        {
            int: round(ms / 86400000) % 7,
            sin: 'day',
            plu: 'days',
            sho: 'd'
        },
        {
            int: round(ms / 3600000) % 24,
            sin: 'hour',
            plu: 'hours',
            sho: 'h'
        },
        {
            int: round(ms / 60000) % 60,
            sin: 'minute',
            plu: 'minutes',
            sho: 'm'
        },
        {
            int: (round(ms / 1000) % 60) + (round(ms) % 1000 / 1000),
            sin: 'second',
            plu: 'seconds',
            sho: 's'
        }
    ]

    const result = []
    for (let i = 0; i < parsed.length; i++) {
        if (!result.length && parsed[i].int === 0) {
            continue
        }

        if (result.length >= maxUnits) {
            break
        }

        let int = parsed[i].int
        if (!result.length && fraction && i === parsed.length - 1) {
            int = int.toFixed(1)
        } else {
            int = int.toFixed(0)
        }

        result.push(`${int}${short ? parsed[i].sho : ' ' + (parseFloat(int) !== 1 ? parsed[i].plu : parsed[i].sin)}`)
    }

    return result.map((res, i) => {
        if (!short) {
            if (i === result.length - 2) {
                return res + ' and'
            } else if (i !== result.length - 1) {
                return res + ','
            }
        }
        return res
    }).join(' ')
}