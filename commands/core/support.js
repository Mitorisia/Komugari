const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class SupportCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'support',
            aliases: ['bug', 'bother'],
            group: 'core',
            memberName: 'support',
            guildOnly: true,
            description: 'Sends a support message to Komugari\'s main server!',
            examples: ['~support [bugs, issues, etc]'],
            details: 'Komugari might reply back in the channel you asked for support in!',
            throttling: {
                usages: 1,
                duration: 30
            }
        });
    }

    async run (message) {
        const notifyChannel = '198399488614727680';
        var channel = this.client.channels.get(notifyChannel);
        const invite = this.client.options.invite;

        let supportMessage = message.content.split(/\s+/g).slice(1).join(" ");

        if(!supportMessage) {
            message.react("💢");
            return message.channel.send(`Please add an issue to your message.`);
        }
    
        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.member.user.tag}`, message.member.user.displayAvatarURL({ format: 'png' }))
                .setColor('48886D')
                .setTimestamp()
                .setFooter(`Channel ID: ${message.channel.id}`)
                .addField(message.guild.name + ', ' + message.channel.name, supportMessage);
            channel.send({embed});

            await message.react("🇸").catch(console.error);
            await message.react("🇪").catch(console.error);
            await message.react("🇳").catch(console.error);
            await message.react("🇹").catch(console.error);

            return null;
    
        } catch(err) {
            return message.channel.send(`<:CANCELLEDLMFAO:372188144059285505> **| An error occurred while running this command!** \`${err.name}: ${err.message}\`\n\Please join the server instead! ${invite}`);
        }
	}
}