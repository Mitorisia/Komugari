const { Command } = require('discord.js-commando');
const rightThere = require('../../assets/json/rightthere');

module.exports = class RightThereCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rightthere',
            aliases: ['goodshit'],
            group: 'fun',
            memberName: 'rightthere',
            description: 'Sends a random right there copypasta!',
            examples: ['rightthere'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    run (message) {
      return message.channel.send(`${rightThere[Math.round(Math.random() * (rightThere.length - 1))]}`);      
}
}
