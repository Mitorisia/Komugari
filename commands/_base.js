const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class baseCommand extends Command {
    constructor(client) {
        super(client, {
            name: '',
            aliases: ['', ''],
            group: '',
            memberName: '',
            description: '',
            examples: [''],
            throttling: {
                usages: 0,
                duration: 0
            }
        });
    }

    run (message) {
        //code here
	}
}