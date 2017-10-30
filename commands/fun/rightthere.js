const { Command } = require('../../commando');
const rightThere = require('../../assets/json/rightthere');

module.exports = class RightThereCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rightthere',
            aliases: ['goodshit', "rthere"],
            group: 'fun',
            memberName: 'rightthere',
            guildOnly: true,
            description: 'Sends a random right there copypasta!',
            details: 'May include NSFW language and elements or considered as spam.',
            examples: ["~rightthere"],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    run(message) {
        return message.channel.send(`${rightThere[Math.round(Math.random() * (rightThere.length - 1))]}`);

    }
}