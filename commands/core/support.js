const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SupportCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'support',
            aliases: ['bug', 'bother'],
            group: 'core',
            memberName: 'support',
            description: 'Sends a support message to Komugari\'s main server!',
            examples: ['~support [bugs, issues, etc]'],
            throttling: {
                usages: 1,
                duration: 30
            }
        });
    }

    async run (message) {
        const notifyChannel = '198399488614727680';
        var channel = this.client.channels.get(notifyChannel);
        let supportMessage = message.content.split(/\s+/g).slice(1).join(" ");
        if(!supportMessage) {
            message.react("💢");
            return message.channel.send(`Please add an issue to your message.`);
        }
    
        try {
            await message.react("🇸").catch(console.error);
            await message.react("🇪").catch(console.error);
            await message.react("🇳").catch(console.error);
            await message.react("🇹").catch(console.error);

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.member.user.tag}`, message.member.user.displayAvatarURL({ format: 'png' }))
                .setColor('48886D')
                .setTimestamp()
                .setFooter(`Channel ID: ${message.channel.id}`)
                .addField(message.guild.name + ', ' + message.channel.name, supportMessage);
            return channel.send({embed});
    
        } catch(err) {
            message.channel.send("There was an issue sending your support message, please try again at a later time.");
        }
	}
}