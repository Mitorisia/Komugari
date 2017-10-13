exports.run = (client, message, Discord, args) => {
    var errMessage = errors[Math.round(Math.random() * (errors.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage)
        return message.react('💢')
    }

    var s = message.content.split(/\s+/g).slice(1).join(" ");

    const Pornsearch = require('pornsearch').default;
    const Searcher = new Pornsearch(s);

    try {
        Searcher.videos()
            .then(videos => message.channel.send(videos[1].url));
            
        return null;

    } catch (err) {
        return message.channel.send(`No results found for **${s}**`)
    }

}

const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Pornsearch = require('pornsearch').default;
const Searcher = new Pornsearch(s);
const errors = require('../../assets/json/errors');


//remember to return before every promise
module.exports = class /*CommandName*/Command extends Command {
    constructor(client) {
        super(client, {
            name: '',
            aliases: ['', ''],
            group: '',
            memberName: '',
            description: '',
            details: 'This command can only be used in NSFW channels!',
            examples: [''],
            throttling: {
                usages: 0,
                duration: 0
            }
        });
    }

    run (message) {
        //code here
	}
}