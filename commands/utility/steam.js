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
                args: [{
                    key: 'query',
                    prompt: 'Please provide me a game to search for!',
                    type: 'string',
                    default: 'Doki Doki Literature Club'
                }]
            });
        }

        async run(message, args) {
            const { query } = args;
            const search = await snekfetch
				.get('https://store.steampowered.com/api/storesearch')
				.query({
					cc: 'us',
					l: 'en',
					term: query
                });
                
            if (!search.body.items.length) return msg.say(`No results found for **${query}**!`);
            
            const { id, tiny_image } = search.body.items[0];
            
			const { body } = await snekfetch
				.get('https://store.steampowered.com/api/appdetails')
                .query({ appids: id });
                
			const { data } = body[id.toString()];
			const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Free';
			const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Free';
			const price = current === original ? current : `~~${original}~~ ${current}`;
			const platforms = [];
			if (data.platforms) {
				if (data.platforms.windows) platforms.push('Windows');
				if (data.platforms.mac) platforms.push('Mac');
				if (data.platforms.linux) platforms.push('Linux');
			}

            const embed = new Discord.MessageEmbed()
                .setColor(0x101D2F)
                .setAuthor('Steam', 'https://i.imgur.com/xxr2UBZ.png', 'http://store.steampowered.com/')
                .setTitle(data.name)
				.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
                .setImage(tiny_image)
				.addField('❯\u2000Price', `•\u2000 ${price}`, true)
				.addField('❯\u2000Metascore', `•\u2000 ${data.metacritic ? data.metacritic.score : '???'}`, true)
				.addField('❯\u2000Recommendations', `•\u2000 ${data.recommendations ? data.recommendations.total : '???'}`, true)
				.addField('❯\u2000Platforms', `•\u2000 ${platforms.join(', ') || 'None'}`, true)
				.addField('❯\u2000Release Date', `•\u2000 ${data.release_date ? data.release_date.date : '???'}`, true)
				.addField('❯\u2000DLC Count', `•\u2000 ${data.dlc ? data.dlc.length : 0}`, true)
				.addField('❯\u2000Developers', `•\u2000 ${data.developers ? data.developers.join(', ') || '???' : '???'}`, true)
				.addField('❯\u2000Publishers', `•\u2000 ${data.publishers ? data.publishers.join(', ') || '???' : '???'}`, true);
		return message.channel.send({ embed });
	}
};