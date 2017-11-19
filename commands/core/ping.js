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
    "Konnichiwa~",
    "Ohayoo~",
    "I'm up and running!",
    "Here I am!",
    "Right here!",
    "Hai!",
    "Hey there!",
    "You found me!",
    "Nya!",
    "N-Nya..?",
    "Nyahaha you found me!"
];

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'core',
            memberName: 'ping',
            description: 'Checks the ping latency and whether or not I\'m operating!',
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    async run(message) {
        let choice = responses[Math.floor(Math.random() * responses.length - 1)];

        const pingMsg = await message.channel.send('🔄 | Pinging...');
        return pingMsg.edit(`🐱 | ${choice} \`(${pingMsg.createdTimestamp - message.createdTimestamp}ms)\``);
    }
};