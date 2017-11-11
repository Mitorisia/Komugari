const { Command } = require('../../commando');

module.exports = class NickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nickname',
            group: 'moderation',
            aliases: ['nick'],
            memberName: 'nickname',
            description: 'Assigns a nickname to a member! Use "clear"or leave it blank to remove the nickname!',
            examples: ['~nickname [user] [name/clear]'],
            guildOnly: true,
            args: [{
                    key: 'member',
                    prompt: 'Please provide me a member to assign nicknames for!',
                    type: 'member'
                },
                {
                    key: 'nickname',
                    prompt: 'Please provide me a nickname to assign!',
                    default: 'clear',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(message) {
        return message.member.hasPermission('MANAGE_NICKNAMES');
    }

    async run(message, args) {
        const { member, nickname } = args;
        if (member.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
            return message.channel.send(`❎ | You can't change **${member.user.username}**'s nickname! Their position is higher than you!`);
        }
        if (!member.bannable) return message.channel.send(`❎ | I can't change **${member.user.username}**'s nickname! Their role is higher than mine!`);

        return await nickname !== 'clear' ? member.setNickname(nickname).then(() => message.say(`The nickname **${nickname}** has been assigned to **${member.user.username}**!`)) : member.setNickname('').then(() => message.say(`**${member.displayName}**'s nickname has been cleared!`));
    };
};