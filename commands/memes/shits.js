const { Command } = require('../../commando');
const Discord = require('discord.js');
const Jimp = require('jimp');

//remember to return before every promise
module.exports = class ShitsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shits',
            group: 'memes',
			memberName: 'shits',
			guildOnly: true,
            description: 'It\'s shit!!!',
            examples: ['~shits [message]'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run (message) {
        if (!message.channel.permissionsFor(this.client.user).has('ATTACH_FILES')) {
			return message.channel.send('I can\'t attach messages!');
		}

		const args = message.content.split(/\s+/g).slice(1).join(" ");
		
		if (args.length < 1) {
			return message.channel.send('Please provide some text!');
		}
	
		const text = message.content.split(/\s+/g).slice(1).join(" ");
		const shits = await Jimp.read('assets/images/SHITS.png');
		const blank = await Jimp.read('assets/images/blank.png');
	
		const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
		
		blank.resize(195, 175);
		const search = blank.print(font, 0, 0, text, 175);
	
		shits.composite(search, 810, 31);
		shits.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
			return await message.channel.send({
				files: [{
					name: 'shits.png',
					attachment: buffer
				}]
			})
		})
	}
}