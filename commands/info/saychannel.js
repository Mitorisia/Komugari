const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SayChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'saychannel',
            aliases: ['sc', 'send', 'portal', 'announce'],
            group: 'info',
            memberName: 'saychannel',
            description: 'This is an admin-only command',
            examples: ['none'],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run (message) {
      if(message.guild.id !== '198399488614727680') return message.channel.send(`This command can only be used in the owner's server.`);
      if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You cannot use this command! (Missing Permissions!)');
      
      try {
        let channelMessage = message.content.split(/\s+/g).slice(2).join(" ");
        if(!channelMessage) return message.channel.send('Provide something for me to send.');
        let channelid = message.content.split(/\s+/g)[1]
        let channel = this.client.channels.get(channelid)
            channel.send(channelMessage);

            await message.react("🇸").catch(console.error);
            await message.react("🇪").catch(console.error);
            await message.react("🇳").catch(console.error);
            await message.react("🇹").catch(console.error);

            return null;
  
      } catch(err) {
        message.channel.send(`There was an error sending your message.`);
      }
	}
}