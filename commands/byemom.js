const Jimp = require('jimp')

exports.run = async function (client, message, Discord, args) {
	if (!message.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return message.reply('I can\'t attach messages!').then(m => m.delete(5000));
	}

	const avatarurl = message.mentions.users.size > 0 ? message.mentions.users.first().displayAvatarURL.replace('gif', 'png') : message.author.displayAvatarURL.replace('gif', 'png')

	if (message.mentions.users.size > 0) {
		args = args.join(' ').substr(21)
	} else {
		args = args.join(' ')
	}

	if (args.length < 1) {
		return message.channel.send('What do you want to google search?')
	}
	if (args.length > 47) {
		return message.channel.send(`Google Search too long. You're ${args.length - 47} characters over the limit!`)
	}

	const avatar = await Jimp.read(avatarurl)
	const avatar2 = avatar.clone()
	const text = args
	const mom = await Jimp.read('./assets/images/mom.png')
	const blank = await Jimp.read('./assets/images/blank.png')

	avatar.resize(70, 70)
	avatar2.resize(125, 125)
	mom.composite(avatar, 530, 15)
	mom.composite(avatar2, 70, 340)

	const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)

	blank.resize(275, 200)
	const search = blank.print(font, 0, 0, text)
	search.rotate(335)

	mom.composite(search, 375, 465)
	mom.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
		try {
			await message.channel.send({
				files: [{
					name: 'mom.png',
					attachment: buffer
				}]
			})
		} catch (err) {
			message.channel.send(`Something went wrong while executing that function.`).then(m => m.delete(5000));
		}
	})


}