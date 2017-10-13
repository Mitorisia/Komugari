const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Jimp = require('jimp');

module.exports = class JpegCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'jpeg',
            group: 'memes',
            memberName: 'jpeg',
            description: 'Who needs quality?',
            examples: ['~jpeg <mention/URL>'],
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
		
		const args = message.content.split(" "); 
		
		let avatarurl = (message.mentions.users.size > 0 ? message.mentions.users.first().displayAvatarURL({ format: 'png' }) : message.author.displayAvatarURL({ format: 'png' })).replace('gif', 'png')
		if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
			avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
		}
	
		const avatar = await Jimp.read(avatarurl);
	
		avatar.resize(157, 157);
	
		avatar.quality(5);
		avatar.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
			try {
				return await message.channel.send({
					files: [{
						name: 'jpeg.png',
						attachment: buffer
					}]
				})
			} catch (e) {
				return message.channel.send(`Something went wrong while executing that function!`);
			}
	
		})
	}
}