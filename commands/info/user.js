const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');


module.exports = class UserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'user',
            aliases: ['info', 'userinfo', 'member'],
            group: 'info',
            memberName: 'user',
            description: 'Shows details about a user!',
            examples: ['~user <mention>'],
            args: [
				{
					key: 'member',
					prompt: 'Which user would you like to get info on?',
					type: 'member',
					default: ''
                }
            ]
        });
    }

    run (message) {
        //code here
	}
}