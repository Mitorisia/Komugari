const { Command } = require('../../commando');
const Discord = require('discord.js');
const tsun = require('../../assets/json/tsundere.json');


module.exports = class TsundereCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tsundere',
            aliases: ['tsun'],
            group: 'anime',
            memberName: 'tsundere',
            guildOnly: true,
            description: 'Get a random tsundere quote!',
            examples: ['~tsundere'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {  
        return message.channel.send(tsun[Math.round(Math.random() * (tsun.length - 1))]);
	}
}