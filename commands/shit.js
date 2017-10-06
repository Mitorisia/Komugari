const Jimp = require('jimp')

exports.run = async function (client, message, Discord, args) {
	if (!message.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return message.reply('I can\'t attach messages!').then(m => m.delete(5000));
	}

	if (message.mentions.users.size > 0) {
		args = message.mentions.users.first().username
	} else {
		if (args < 1) {
			args = message.author.username
		} else if (args.join(' ').length > 35) {
			return message.channel.send(`The limit is 35 characters! You're ${args.join(' ').length - 35} characters over the limit!`)
		} else {
			args = args.join(' ')
		}
	}

	const text = args
	const shit = await Jimp.read('./assets/images/shit.jpg')
	const blank = await Jimp.read('./assets/images/Empty.png')

	const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)

	blank.resize(350, 350)
	const search = blank.print(font, 0, 0, text, 350)
	search.rotate(310)

	shit.composite(search, 195, 585)
	shit.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
		try {
			await message.channel.send({
				files: [{
					name: 'shit.png',
					attachment: buffer
				}]
			})
		} catch (err) {
			message.channel.send(`Something went wrong while executing that function.`).then(m => m.delete(5000));
		}
	})
}