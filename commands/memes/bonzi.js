const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Jimp = require('jimp');

//remember to return before every promise
module.exports = class BonziCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bonzi',
            aliases: ['fact'],
            group: 'memes',
            memberName: 'bonzi',
            description: 'Makes Bonzi tell an interesting fact!',
            examples: ['~bonzi [message]'],
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
	
		const argu = message.content.split(/\s+/g).slice(1).join(" ");
		if (!argu) {
			return message.channel.send('Please provide arguments!');
		}
	
		const text = message.content.split(/\s+/g).slice(1).join(" ");
		const bonzi = await Jimp.read('assets/images/bonzi.png');
		const blank = await Jimp.read('assets/images/blank.png');
	
		const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
	
		blank.resize(175, 120);
		const fact = blank.print(font, 0, 0, text, 175);
	
		try{
		bonzi.composite(fact, 23, 12);
		bonzi.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
				return await message.channel.send({
					files: [{
						name: 'bonzi.png',
						attachment: buffer
					}]
				})
		})
		} catch(err) {
			return message.channel.send(`<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that function!`);
		}
	}
}