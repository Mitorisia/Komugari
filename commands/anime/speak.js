exports.run = async (client, message, Discord) => {
	if (!message.channel.permissionsFor(client.user.id).has(['CONNECT', 'SPEAK', 'ADD_REACTIONS'])) {
		message.react('❓')
		return message.channel.send('I don\'t have the permissions to do this!').then(m => m.delete(5000));
	}

	if (!message.member.voiceChannel) {
		message.react('💢')
		return message.channel.send('Join a voice channel to hear me!').then(m => m.delete(5000));

	} else {
		try {
			var voiceChannel = message.member.voiceChannel;
			var file = Math.floor(Math.random() * 42 + 1)
		
			if (!client.voiceConnections.get(message.guild.id)) {
				message.react('🐱')
				const conn = await message.member.voiceChannel.join()
				conn.playFile(`./assets/sounds/anime/${file}.opus`)
				conn.player.dispatcher.once('end', () => {
					conn.channel.leave()
				})
			} else {
				message.react('‼')
				return message.channel.send('Hold on... I\'m already playing in a voice channel!').then(m => m.delete(5000));
		}
	} catch(err) {
		console.log(err)
	}	
}
}
