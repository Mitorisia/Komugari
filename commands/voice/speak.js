const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SpeakCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'speak',
            group: 'voice',
            memberName: 'speak',
            description: 'I\'ll say a random phrase in the voice chat!',
            examples: ['~speak'],
        });
    }

    async run (message) {
		if (!message.channel.permissionsFor(this.client.user.id).has(['CONNECT', 'SPEAK', 'ADD_REACTIONS'])) {
			message.react('❓');
			return message.channel.send('I don\'t have the permissions to do this!');
		}
	
		if (!message.member.voiceChannel) {
			message.react('💢');
			return message.channel.send('Join a voice channel to hear me!');
	
		} else {
			try {
				var voiceChannel = message.member.voiceChannel;
				var file = Math.floor(Math.random() * 42 + 1);
			
				if (!this.client.voiceConnections.get(message.guild.id)) {
					message.react('🐱');
					const conn = await message.member.voiceChannel.join();
					conn.playFile(`../../assets/sounds/anime/${file}.opus`);
					conn.player.dispatcher.once('end', () => {
						return conn.channel.leave();
					})
				} else {
					message.react('‼');
					return message.channel.send('Hold on... I\'m already playing in a voice channel!');
			}
		} catch(err) {
			return console.log(err);
		}	
	}
	}
}