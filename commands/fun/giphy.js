const { Command } = require('../../commando');
const snekfetch = require('snekfetch');

module.exports = class GiphyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'giphy',
			group: 'fun',
			aliases: ['gif'],
			memberName: 'giphy',
            description: 'Searches Giphy for gifs!',
            examples: ['~giphy [tags]'],
			args: [
				{
					key: 'query',
					prompt: 'Please provide me a term to search for!',
                    type: 'string',
                    default: 'ddlc'
				}
			]
		});
	}

	async run(message, args) {
		const { query } = args;
		const { body } = await snekfetch
			.get('http://api.giphy.com/v1/gifs/search')
			.query({
				q: query,
				api_key: process.env.GIPHYKEY,
				rating: message.channel.nsfw ? 'r' : 'pg'
            });
            
		if (!body.data.length) return message.channel.send(`No results found for **${query}**!`);
		const random = Math.floor(Math.random() * body.data.length);
		return message.channel.send(body.data[random].images.original.url);
	}
};
