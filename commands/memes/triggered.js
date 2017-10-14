const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Jimp = require('jimp');
const GIFEncoder = require('gifencoder');

const options = {
	size: 256,
	frames: 8
}

module.exports = class TriggeredCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'triggered',
            group: 'memes',
			memberName: 'triggered',
			guildOnly: true,
            description: 'T R I G G E R E D',
            examples: ['~triggered <mention>'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run (message) {
        function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		const args = message.content.split(" "); 
		
		if (!message.channel.permissionsFor(this.client.user.id).has('ATTACH_FILES')) {
			return message.channel.send('I can\'t attach messages!');
		}
	
		let avatarurl = (message.mentions.users.size > 0 ? message.mentions.users.first().displayAvatarURL({ format: 'png' }) : message.author.displayAvatarURL({ format: 'png' }));
	
		const base = new Jimp(options.size, options.size);
		const avatar = await Jimp.read(avatarurl);
		const text = await Jimp.read('assets/images//triggered/triggered.jpg');
		const tint = await Jimp.read('assets/images/triggered/red.png');
	
		avatar.resize(320, 320);
		tint.scaleToFit(base.bitmap.width, base.bitmap.height)
		tint.opacity(0.2)
		text.scaleToFit(280, 60)
	
		const frames = [];
		const buffers = [];
		const encoder = new GIFEncoder(options.size, options.size);
		const stream = encoder.createReadStream();
		let temp
	
		stream.on('data', async buffer => await buffers.push(buffer));
		stream.on('end', async () => {
			try {
				return await message.channel.send({
					files: [{
						name: 'triggered.gif',
						attachment: Buffer.concat(buffers)
					}]
				})
				
			} catch (e) {
				return message.channel.send(`Something went wrong while executing that function.`);
			}
	
		})
	
		for (let i = 0; i < options.frames; i++) {
			temp = base.clone()
	
			if (i === 0) {
				temp.composite(avatar, -16, -16)
			} else {
				temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16))
			}
	
			temp.composite(tint, 0, 0)
	
			if (i === 0) {
				temp.composite(text, -10, 200)
			} else {
				temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12))
			}
	
			frames.push(temp.bitmap.data)
		}
	
		encoder.start()
		encoder.setRepeat(0)
		encoder.setDelay(20)
		for (const frame of frames) {
			encoder.addFrame(frame)
		}
		encoder.finish()
	
	}	
}
