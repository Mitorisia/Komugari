const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class SteamCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'steam',
            group: 'utility',
            aliases: ['game'],
			memberName: 'steam',
			description: 'Searches Steam for games!',
            clientPermissions: ['EMBED_LINKS'],
            examples: ['~steam [game search]'],
			args: [
				{
					key: 'query',
					prompt: 'Please provide me a game to search for!',
                    type: 'string',
                    default: 'Doki Doki Literature Club'
				}
			]
		});
	}

	async run(message, args) {
		const { query } = args;
		const { body } = await snekfetch
			.get('https://store.steampowered.com/api/storesearch')
			.query({
				cc: 'us',
				l: 'en',
				term: query
			});
        if (!body.total) return message.channel.send(`No results found for **${query}**!`);

        console.log(body.items[0])
        
		const current = body.items[0].price ? body.items[0].price.final / 100 : 0.00;
		const original = body.items[0].price ? body.items[0].price.initial / 100 : 0.00;
        const price = current === original ? `$${current}` : `~~$${original}~~ $${current}`;
        
		const embed = new Discord.MessageEmbed()
			.setColor(0x101D2F)
			.setAuthor(body.items[0].name, 'https://i.imgur.com/vL8b4D5.png')
			.setURL(`http://store.steampowered.com/app/${body.items[0].id}`)
            .setImage(body.items[0].tiny_image)
            .setDescription(`•\u2000\**Price:** ${price} **Metascore:** ${body.items[0].metascore || '`N/A`'}`);
		return message.channel.send({ embed });
	}
};
