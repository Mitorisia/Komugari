const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class SecretCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'secret',
            guildOnly: true,
            aliases: ['hidden', 'easteregg', 'secrets'],
            group: 'owner',
            memberName: 'secret',
            description: 'Hey look, hidden commands!',
            examples: ['~secret'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor("Secret Commands", 'https://a.safe.moe/Tr9Jr.png')
            .setDescription(`Congrats! You found some the secret commands! Have fun...?`)
            .setColor('727293')
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .setFooter("These are only here to de-clutter the main commands interface...")
            .addField("__Owner-Only:__", "`eval` `reload`", true)
            .addField("__Bot Admin-Only:__", "`saychannel`", true)
            .addField("__Hidden Utility:__", "`ping` `botinfo`")
        message.channel.send({embed}).then(m=> {m.react('🎴')});

        return null; 
	}
}