const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class SecretCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'secret',
            guildOnly: true,
            aliases: ['hidden', 'secrets', 'commands2', 'extra', 'extras', 'morecommands'],
            group: 'core',
            memberName: 'secret',
            description: 'Hey look, more commands!',
            details: 'So very secret...',
            examples: ['~secret'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run(message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor("Secret Commands", 'https://a.safe.moe/Tr9Jr.png')
            .setDescription(`Here's the not-so-secret and not-so-useful commands!`)
            .setColor('727293')
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .setFooter("These are only here to de-clutter the main commands interface...")
            .addField("__Owner-Only:__", "`eval` `reload`", true)
            .addField("__Bot Admin-Only:__", "`saychannel`", true)
            .addField("__Core:__", "`botinfo` `ping` `support` `uptime`", true)
            .addField("__Fun:__", "`bird` `iku` `lizard`", true)
            .addField('__Moderation:__', '`addrole` `delrole` `hackban` `lockdown` `nickname`\n\`nuke` `pruneuser` `pruneword` `softban` `unban`', true)
            .addField("__Utility:__", "`remindme`", true)
        message.channel.send({ embed }).then(m => { m.react('🎴') });

        return null;
    }
}