const { Command } = require('../../commando');

module.exports = class SayChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'saychannel',
            aliases: ['sc', 'send', 'portal', 'announce'],
            group: 'owner',
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

    async run(message) {
        if (message.guild.id !== '198399488614727680') return message.channel.send(`This command can only be used in the owner's server.`);
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You cannot use this command!');

        try {
            let channelMessage = message.content.split(/\s+/g).slice(2).join(" ");
            if (!channelMessage) return message.channel.send('Provide something for me to send.');
            let channelid = message.content.split(/\s+/g)[1]
            let channel = this.client.channels.get(channelid)
            channel.send(channelMessage);

            await message.react("🇸").catch(console.error);
            await message.react("🇪").catch(console.error);
            await message.react("🇳").catch(console.error);
            await message.react("🇹").catch(console.error);

            return null;

        } catch (err) {
            return message.channel.send(`❎ | **An error occurred while running this command!** \`${err}\``);
        }
    }
}