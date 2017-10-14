const { Command } = require('discord.js-commando');
const Discord = require('discord.js');


module.exports = class RoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'role',
            aliases: ['roleinfo'],
            group: 'info',
            memberName: 'role',
            description: 'Shows detailed description of a role!',
            examples: [''],
            args: [
				{
					key: 'role',
					prompt: 'Please provide me with a role to get the information of!',
					type: 'role'
				}
			]
        });
    }

    run (message) {
        //code here
	}
}