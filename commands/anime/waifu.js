const { Command } = require('../../commando');
const Discord = require('discord.js');
const waifus = require('../../assets/json/waifus.json');
const total = Object.keys(waifus).length

const weefi = [
    'https://gfycat.com/KindheartedContentIberianmidwifetoad',
    'http://i.imgur.com/U25HMyz.gifv',
    'http://i.imgur.com/0xhBPbR.gif',
    'Your waifu is me...right?',
    'https://media.giphy.com/media/2PW8oTlHnVaZa/giphy.gif',
    'https://thumbs.gfycat.com/BiodegradableWillingIchneumonfly-max-1mb.gif',
    'https://i.makeagif.com/media/10-19-2015/PyKTt9.gif',
    'https://i.imgur.com/hn0YsNQ.gif',
    'https://media.giphy.com/media/xUA7aVR8tUqIHdAjPa/giphy.gif',
    'http://i0.kym-cdn.com/photos/images/original/001/203/473/1cd.gif',
    'https://media1.tenor.com/images/0e6d6a8f61b84b1ea6cdb13522a39753/tenor.gif?itemid=5237833',
    'https://i.imgur.com/5XuI7W8.gif',
    'http://i.imgur.com/usJbYkw.gif'
]

module.exports = class WaifuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'waifu',
            aliases: ['waif'],
            group: 'anime',
            memberName: 'waifu',
            guildOnly: true,
            wait: 0.1,            
            description: `Finds you a waifu from a database of ${total} waifus!`,
            details: 'Others can vote on the waifu through reactions!\n\Also #119 is best girl.',
            examples: ['~waifu <optional number>'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: 'number',
                prompt: 'Give me a number and I\'ll find the respective waifu!',
                type: 'integer',
                default: 'none',
                validate: waifuNumber => {
                    if (waifuNumber <= total && waifuNumber > 0) return true;
                    return `That's not a valid waifu number! There are only **${total}** waifus right now, *choose a number between 1 and ${total}*!`;
                },
            }]
        });
    }

    async run(message, args) {
        let somethingThere = message.content.split(/\s+/g).slice(1).join(" ");
        const percentage = Math.random()
        if (!somethingThere || args.number == 'none') {
            var random = Math.floor(Math.random() * total + 1);
            var waifu = waifus[random];

            const embed = new Discord.MessageEmbed()
                .setAuthor(waifu.name, waifu.image)
                .setDescription(waifu.origin)
                .setImage(waifu.image)
                .setFooter(`Waifu Number ${random}`)
                .setColor('#FAC193');
            var ms = await message.channel.send(`💝 **${waifu.name}**? `, { embed: embed });
            await ms.react('👍');
            await ms.react('👎');

            return null;

        } else if (somethingThere) {
            const waifuNumber = args.number
            var waifu = waifus[waifuNumber]
            const embed = new Discord.MessageEmbed()
                .setAuthor(waifu.name, waifu.image)
                .setDescription(waifu.origin)
                .setImage(waifu.image)
                .setFooter(`Waifu Number ${waifuNumber}`)
                .setColor('#FAC193');
            var ms = await message.channel.send(`💝 Here's waifu number **${waifuNumber}**!`, { embed: embed });
            await ms.react('👍');
            await ms.react('👎');

            return null;

        } else if (percentage < 0.05) {
            return message.channel.send(weefi[Math.round(Math.random() * (weefi.length - 1))])
        }
    }
}