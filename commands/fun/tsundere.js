const { Command } = require('../../commando');
const Discord = require('discord.js');
const tsun = require('../../assets/json/tsundere.json');


module.exports = class TsundereCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tsundere',
            aliases: ['tsun'],
            group: 'fun',
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
        try {
          return message.channel.send(tsun[Math.round(Math.random() * (tsun.length - 1))]);
        
        } catch(err) {
          message.react('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658>');
          return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that command!')
        }
	}
}