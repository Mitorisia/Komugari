const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Jimp = require('jimp');

module.exports = class RetardedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'retarded',
            group: 'memes',
            memberName: 'retarded',
            description: 'A cute(???) little dog???',
            examples: ['~retarded [message]'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run (message) {
        if (!message.channel.permissionsFor(this.client.user.id).has('ATTACH_FILES')) {
			return message.channel.send('I can\'t attach messages!')
		}

		const argu = message.content.split(/\s+/g).slice(1).join(" ");
		
		if (!argu) {
			return message.channel.send('Please provide some text!');
		}
	
		const text = message.content.split(/\s+/g).slice(1).join(" ");
		const retarded = await Jimp.read('assets/images/retarded.png');
		const blank = await Jimp.read('assets/images/blank.png');
	
		const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
		
		blank.resize(225, 45);
		const search = blank.print(font, 0, 0, text, 225);
	
		retarded.composite(search, 295, 5);
		retarded.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
			try {
				return await message.channel.send({
					files: [{
						name: 'retarded.png',
						attachment: buffer
					}]
				})
				
			} catch (err) {
				return message.channel.send(`Something went wrong while executing that function!`);
			}
		})
	}
}