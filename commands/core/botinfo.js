const { Command } = require('../../commando');
const Discord = require('discord.js');
const moment = require('moment');
const ostb = require('os-toolbox');
const { version } = require('../../package.json');
const { fromNow, humanizeDuration } = require('../../commando/util')

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
            .setURL('https://discordapp.com/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=1043721303')
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('#6C70EB')
            .setFooter('Made with ❤ by Mako#8739 using Discord.js and Discord.js-Commando')
            .addField('❯\u2000\System', `•\u2000\**Ping:** ${ping}ms\n\•\u2000\**CPU Load:** ${cpuLoad}%\n\•\u2000\**Memory Usage:** ${memoryUsage}%\n\•\u2000\**Heap:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField('❯\u2000\Presence', `•\u2000\**Servers:** ${this.client.guilds.size}\n\•\u2000\**Users:** ${this.client.users.size}\n\•\u2000\**Voice Channels:** ${this.client.voiceConnections.size}`, true)
            .addField('❯\u2000\Miscellaneous', `•\u2000\**Created:** ${moment(this.client.user.createdAt).format('MMMM Do YYYY')} \`(${fromNow(this.client.user.createdAt)})\`\n\•\u2000\**Uptime:** ${humanizeDuration(this.client.uptime, 3, true)}\n\•\u2000\**Commands:** ${this.client.registry.commands.size}`, true)
            .addField('❯\u2000\Links', `•\u2000\[Website](https://mitorisia.github.io/Komugari/)\n\•\u2000\[GitHub](https://github.com/Mitorisia/Komugari/)`)
        return msg.edit('🈯 **Here\'s my current info!**', { embed: embed });
    }
}