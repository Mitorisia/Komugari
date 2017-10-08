const file = Math.floor(Math.random() * 42 + 1)

exports.run = async (client, message, Discord) => {
	if (!message.channel.permissionsFor(client.user.id).has(['CONNECT', 'SPEAK', 'ADD_REACTIONS'])) {
		return message.reply('I can\'t join nor play in the specified channel!')
	}

	if (!message.member.voiceChannel) {
		return message.channel.send('Join a voice channel to hear me!')
	} else {

		try {
			var voiceChannel = message.member.voiceChannel;
		
			if (!client.voiceConnections.get(message.guild.id)) {
				const conn = await message.member.voiceChannel.join()
				conn.playFile(`./assets/sounds/anime/${file}.opus`)
				conn.player.dispatcher.once('end', () => {
					conn.channel.leave()
				})
			} else {
				return message.channel.send('Hold on... I\'m already playing in a voice channel!')
		}
	} catch(err) {
		console.log(err)
	}	
}
}
