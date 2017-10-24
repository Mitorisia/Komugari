const { Command } = require('../../commando');
const Discord = require('discord.js');
const waifus = require('../../assets/json/waifus.json');
const total = Object.keys(waifus).length

module.exports = class WaifuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'waifu',
            group: 'anime',
            memberName: 'waifu',
            guildOnly: true,
            description: `Finds you a waifu from a database of ${total} waifus!`,
            details: 'Others can vote on the waifu through reactions!\n\Also #119 is best girl.',
            examples: ['~waifu <optional number>'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [
				{
					key: 'number',
					prompt: 'Give me a number and I\'ll find the respective waifu!',
					type: 'integer',
                    default: '',
                    validate: waifuNumber => {
						if (waifuNumber <= total && waifuNumber > 0) return true;
						return `That's not a valid waifu number! There are only **${total}** waifus right now, *choose a number between 1 and ${total}*!`;
					},
				}
			]
        });
    }

    async run (message, args) {
        let somethingThere = message.content.split(/\s+/g).slice(1).join(" ");
        
        if(!somethingThere) {
            var random = Math.floor(Math.random() * total + 1);
            var waifu = waifus[random];

            const embed = new Discord.MessageEmbed()
                .setAuthor(waifu.name, waifu.image)
                .setDescription(waifu.origin)
                .setImage(waifu.image)
                .setFooter(`Waifu Number ${random}`)
                .setColor('#FAC193');
            var ms = await message.channel.send(`💝 **${waifu.name}**? `, {embed: embed});
                await ms.react('👍');
                await ms.react('👎');

                return null;
        
        } else {
            const waifuNumber = args.number
            var waifu = waifus[waifuNumber]
            const embed = new Discord.MessageEmbed()
                .setAuthor(waifu.name, waifu.image)
                .setDescription(waifu.origin)
                .setImage(waifu.image)
                .setFooter(`Waifu Number ${waifuNumber}`)
                .setColor('#FAC193');
            var ms = await message.channel.send(`💝 Here's waifu number **${waifuNumber}**!`, {embed: embed});
                await ms.react('👍');
                await ms.react('👎');

                return null;
        }
	}
}