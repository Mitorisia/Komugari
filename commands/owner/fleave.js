const { Command } = require('../../commando');

module.exports = class FLeaveCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'fleave',
            aliases: ['forceleave', 'leaveguild', 'removeguild'],
            group: 'owner',
            memberName: 'fleave',
            description: 'Leaves a guild!',
            details: 'Only the bot owner can use this command!',
            examples: ['~fleave 1234567890'],

            args: [{
                key: 'toLeave',
                label: 'toLeave',
                prompt: 'What guild would you like to leave?',
                type: 'string'
            }],
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);
    }

    async run(message, args) {

        let guild = this.client.guilds.get(args.toLeave)

        try {
            guild.defaultChannel.send('**ALERT:** Your guild has been marked as an illegal guild. \nThis may be due to it being marked as a bot guild or marked as a spam guild. \nThe bot will now leave this server. \nIf you wish to speak to my developer, you may join here: https://discord.gg/6P6MNAU')
            guild.leave()
            return message.reply('')
        } catch (err) {
            return message.channel.send(`There was an error leaving the specified guild! \`${err}\``)
        }
  }
};
