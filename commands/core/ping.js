const { Command } = require('../../commando');

const responses = [
    'Pong!',
    'I-It\'s not like I wanted to say pong or anything...',
    'Pong...',
    'Testing, testing, 1, 2, 3!',
    'Anyone there?',
    'Does anyone even use this?',
    'Woo! A secret command!',
    'Ping! ...I mean **pong!**',
    'Hi there!',
    'At your service!',
    'Yes?',
    'Hello!',
    "Konnichiwa!",
    "Ohayoo~!"
];

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'core',
            memberName: 'ping',
            description: 'Checks the ping latency and if the bot is operating!',
            throttling: {
                usages: 5,
                duration: 10
            }
        });
    }

    async run(message) {
        let choice = Math.floor(Math.random() * responses.length);

        const pingMsg = await message.channel.send('Pinging...');
        return pingMsg.edit(`🏓 | ${responses[choice]} \`(${pingMsg.createdTimestamp - message.createdTimestamp}ms)\``);
    }
};