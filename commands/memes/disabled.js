const { Command } = require('../../commando');
const Discord = require('discord.js');
const Jimp = require('jimp');

module.exports = class DisabledCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'disabled',
            group: 'memes',
            guildOnly: true,
            clientPermissions: ['ATTACH_FILES'],
            memberName: 'disabled',
            description: 'The public should know what disability looks like!',
            examples: ['~disabled <mention/url>'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run(message) {

        const args = message.content.split(" ").slice(1)

        await message.channel.startTyping()

        let avatarurl = (message.mentions.users.size > 0 ? message.mentions.users.first().displayAvatarURL({ format: 'png' }) : message.author.displayAvatarURL({ format: 'png' })).replace('gif', 'png');
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
        }

        var avatar = await Jimp.read(avatarurl);
        const disabled = await Jimp.read('assets/images/disabled.png');

        avatar.resize(157, 157);

        disabled.composite(avatar, 390, 252);
        disabled.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
            await message.channel.send({
                files: [{
                    name: 'disabled.png',
                    attachment: buffer
                }]
            })
            await message.channel.stopTyping()
        })

        return null;
    }
}