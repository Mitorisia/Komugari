const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class MagikCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'magik',
            guildOnly: true,
            aliases: ['magic', 'contentawareness', 'contentaware'],
            group: 'memes',
            memberName: 'magik',
            description: 'Applies the magik filter to your image!',
            examples: ['~magik [attachment/link]'],
            throttling: {
                usages: 1,
                duration: 15
            }
        });
    }

    async run (message) {
        if (!message.channel.permissionsFor(this.client.user).has('ATTACH_FILES')) {
            return message.channel.send('I can\'t attach messages!');
        }

        const args = message.content.split(" ").slice(1)

        const msg = await message.channel.send('🔄 | Adding a hint of magik...')

        let avatarurl = (message.mentions.users.size > 0 ? message.mentions.users.first().displayAvatarURL({ format: 'png', size: 512 }) : message.author.displayAvatarURL({ format: 'png', size: 512 })).replace('gif', 'png');
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
        }

        const res = await snekfetch.get(`https://discord.services/api/magik?url=${avatarurl}`)

        if (res.body == 'some error sry :/') {
            await msg.delete()
            return message.channel.send('❎ | Invalid image/URL! Please try again!')
        } else {
            await msg.delete()
            const embed = new Discord.MessageEmbed() 
                .setColor('#294475') 
                .setImage(`https://discord.services/api/magik?url=${avatarurl}`); 
            return message.channel.send({embed}) 
        }
	}
}
