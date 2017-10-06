const Jimp = require('jimp')

exports.run = async function (client, message, Discord, args) {
	if (!message.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return message.reply('I can\'t attach messages!').then(m => m.delete(5000));
	}

	if (args.length < 1) {
		return message.channel.send('Please provide arguments.')
	}

	const text = message.content.split(/\s+/g).slice(1).join(" ");
    const retarded = await Jimp.read('./assets/images/retarded.png')
    const blank = await Jimp.read('./assets/images/blank.png')

    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
    
	blank.resize(225, 45)
	const search = blank.print(font, 0, 0, text, 225)

    retarded.composite(search, 295, 5)
	retarded.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
		try {
			await message.channel.send({
				files: [{
					name: 'retarded.png',
					attachment: buffer
				}]
			})
		} catch (err) {
			message.channel.send(`Something went wrong while executing that function.`).then(m => m.delete(5000));
		}
	})
}