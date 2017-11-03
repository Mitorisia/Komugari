const { Command } = require('../../commando');
const moment = require('moment');
const sherlock = require('sherlockjs');

module.exports = class RemindMeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remindme',
            aliases: ['remind', 'timer', 'alarm'],
            group: 'utility',
            memberName: 'remindme',
            description: 'I\'ll remind you of something!',
            details: 'This does not persist across restarts! Please keep it short!',
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 3
            },

            args: [{
                key: 'remind',
                label: 'reminder',
                prompt: 'what would you like me to remind you about?\n',
                type: 'string',
                validate: time => {
                    const remindTime = sherlock.parse(time);
                    if (!remindTime.startDate) return `please provide a valid starting time.`;

                    return true;
                },
                parse: time => sherlock.parse(time)
            }]
        });
    }

    async run(message, { remind }) {
        const time = remind.startDate.getTime() - Date.now();
        const preRemind = await message.channel.send(`I will remind you **${cleanContent(message, remind.eventTitle)}** ${moment().add(time, 'ms').fromNow()}!`);
        const remindMessage = await new Promise(resolve => {
            setTimeout(() => resolve(message.author.send(`⏰ | ${cleanContent(message, remind.eventTitle)}!`)), time);
        });

        return [preRemind, remindMessage];
    }
};

function cleanContent(message, content) {
    return content.replace(/@everyone/g, '@\u200Beveryone')
        .replace(/@here/g, '@\u200Bhere')
        .replace(/<@&[0-9]+>/g, roles => {
            const replaceID = roles.replace(/<|&|>|@/g, '');
            const role = message.channel.guild.roles.get(replaceID);

            return `@${role.name}`;
        })
        .replace(/<@!?[0-9]+>/g, user => {
            const replaceID = user.replace(/<|!|>|@/g, '');
            const member = message.channel.guild.members.get(replaceID);

            return `@${member.user.username}`;
        });
}