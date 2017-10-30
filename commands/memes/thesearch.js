const { Command } = require('../../commando');
const Discord = require('discord.js');
const Jimp = require('jimp');

//remember to return before every promise
module.exports = class TheSearchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'thesearch',
            group: 'memes',
            memberName: 'thesearch',
            guildOnly: true,
            description: 'What if there\'s intelligible life on Earth?',
            examples: ['~thesearch [message]'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run(message) {
        if (!message.channel.permissionsFor(this.client.user).has('ATTACH_FILES')) {
            return message.channel.send('I can\'t attach messages!');
        }

        const args = message.content.split(/\s+/g).slice(1).join(" ");

        if (args.length < 1) {
            return message.channel.send('Please provide some text!');
        }

        const text = message.content.split(/\s+/g).slice(1).join(" ");
        const thesearch = await Jimp.read('assets/images/thesearch.png');
        const blank = await Jimp.read('assets/images/blank.png');

        const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

        blank.resize(160, 70);
        const search = blank.print(font, 0, 0, text, 150);

        thesearch.composite(search, 60, 331);
        thesearch.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
            return await message.channel.send({
                files: [{
                    name: 'thesearch.png',
                    attachment: buffer
                }]
            })
        })
    }
}