const { Command } = require('../../commando');
const Discord = require('discord.js');
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
            args: [{
                key: 'query',
                prompt: 'Please provide me a term to search for!',
                type: 'string',
                default: 'wtf'
            }]
        });
    }

    async run(message, args) {
        var { query } = args;

        var res = await snekfetch
            .get('http://api.giphy.com/v1/gifs/search')
            .query({
                q: query.split(' ').join('+'),
                api_key: process.env.GIPHYKEY,
                rating: message.channel.nsfw ? 'r' : 'pg',
                limit: 5
            })

        var body = res.body
        if (!body.data.length) return message.channel.send(`No results found for **${query}**!`);
        const random = Math.floor(Math.random() * body.data.length);

        const embed = new Discord.MessageEmbed()
            .setImage(body.data[random].images.original.url)
            .setColor("#ADC4CC")

        message.channel.send({ embed })
    }
};