const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class SpeakCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'speak',
            group: 'voice',
			memberName: 'speak',
			guildOnly: true,
            description: 'I\'ll say a random phrase in the voice chat!',
            examples: ['~speak'],
        });
    }

    async run (message) {
	
		if (!message.member.voiceChannel) {
			message.react('💢');
			return message.channel.send('Join a voice channel to hear me!');
	
		} else {
			try {
			
				if (!this.client.voiceConnections.get(message.guild.id)) {

					var file = Math.floor(Math.random() * 49 + 1);

					const channel = message.member.voiceChannel;
					message.channel.send({ files: [`./assets/sounds/anime/${file}.opus`, `./assets/sounds/anime/${file}.opus`]})

					channel.join().then(connection => { 
					  const dispatcher = connection.playFile(`./assets/sounds/anime/${file}.opus`);

					  dispatcher.on("end",  () => {
						  return channel.leave()
						});

					}).catch(err => console.log(err));

					message.react('🐱');

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