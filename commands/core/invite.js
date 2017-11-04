const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            guildOnly: true,
            aliases: [ 'oauth', 'get', 'link', 'invlink'],
            group: 'core',
            memberName: 'invite',
            description: 'Gives you the invite link!',
            examples: ['~invite'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        var phrases = [
            'Add me to your server with this link!',
            'I-It\'s not like I want to be invited to your server...',
            'Invite me Onee-chan!',
            'Hello... Please take me...',
            'I\'d love to be in your server!',
            'B-Baka! u///u I-I\'s not like I wanted to be in your server...',
            'Kyaaa~~ A server? Of course!',
            'P-Please invite me.. to your server...'
        ]

        var phrase = phrases[Math.round(Math.random() * (phrases.length - 1))];

        return message.channel.send(phrase + ' <https://discordapp.com/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=305523782>')
	}
}