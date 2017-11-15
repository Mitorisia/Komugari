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
                    prompt: 'what would you like me to remind you about?',
                    type: 'string',
                },
                {
                    key: 'time',
                    label: 'time',
                    prompt: 'In how long would you like me to remind you?',
                    type: 'string',
                    validate: time => {
                        const remindTime = sherlock.parse(time);
                        if (!remindTime.startDate) return `please provide a valid starting time.`;

                        return true;
                    },
                    parse: time => sherlock.parse(time)
                }
            ]
        });
    }

    async run(message, args) {
        const { remind, time } = args;

        const timer = time.startDate.getTime() - Date.now();
        const preRemind = await message.channel.send(`Got it! I will remind you in **${moment().add(timer, 'ms').fromNow(true)}**! \`(${timer}ms)\``);
        const remindMessage = await new Promise(resolve => {
            setTimeout(() => resolve(message.author.send(`⏰ | ${remind}!`)), timer);
        });

        return [preRemind, remindMessage];
    }
};