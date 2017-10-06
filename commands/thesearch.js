const Jimp = require('jimp')

exports.run = async function (client, message, Discord, args) {
	if (!message.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return message.reply('I can\'t attach messages!').then(m => m.delete(5000));
	}

	if (args.length < 1) {
		return message.channel.send('Please provide arguments.')
	}

	const text = message.content.split(/\s+/g).slice(1).join(" ");
    const thesearch = await Jimp.read('./assets/images/thesearch.png')
    const blank = await Jimp.read('./assets/images/blank.png')

	const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)

	blank.resize(160, 70)
	const search = blank.print(font, 0, 0, text, 150)

	thesearch.composite(search, 60, 331)
	thesearch.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
		try {
			await message.channel.send({
				files: [{
					name: 'thesearch.png',
					attachment: buffer
				}]
			})
		} catch (err) {
			message.channel.send(`Something went wrong while executing that function.`).then(m => m.delete(5000));
		}
	})
}