const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Jimp = require('jimp');

//remember to return before every promise
module.exports = class ShitCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shit',
            group: 'memes',
			memberName: 'shit',
			guildOnly: true,
            description: 'It\'s shit!!!',
            examples: ['~shit [message]'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run (message) {
        if (!message.channel.permissionsFor(this.client.user.id).has('ATTACH_FILES')) {
			return message.channel.send('I can\'t attach messages!');
		}
	
		var args = message.content.split(/\s+/g).slice(1)

		if (message.mentions.users.size > 0) {
			args = message.mentions.users.first().username;
		} else {
			if (args < 1) {
				args = message.author.username;
			} else if (args.join(' ').length > 35) {
				return message.channel.send(`The limit is 35 characters! You're ${args.join(' ').length - 35} characters over the limit!`);
			} else {
				args = args.join(' ');
			}
		}
	
		const text = args;
		const shit = await Jimp.read('assets/images/shit.jpg');
		const blank = await Jimp.read('assets/images/Empty.png');
	
		const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
	
		blank.resize(350, 350);
		const search = blank.print(font, 0, 0, text, 350);
		search.rotate(310);
	
		shit.composite(search, 195, 585);
		shit.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
			try {
				return await message.channel.send({
					files: [{
						name: 'shit.png',
						attachment: buffer
					}]
				})
				
			} catch (err) {
				return message.channel.send(`✖ Something went wrong while executing that function.`);
			}
		})
	}
}