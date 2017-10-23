const { Command } = require('../../commando');
const Discord = require('discord.js');
const Pornsearch = require('pornsearch').default;
const errors = require('../../assets/json/errors');


module.exports = class PornHubCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pornhub',
            aliases: ['ph'],
            group: 'nsfw',
            memberName: 'pornhub',
            guildOnly: true,
            description: 'Searches for videos on Pornhub!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~pornhub [search]'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if(!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }
    
        var s = message.content.split(/\s+/g).slice(1).join(" ");

        if(!s) {
            return message.channel.send('Please provide me something to search for!')
        }
    
        var Searcher = new Pornsearch(s);
    
        try {
            Searcher.videos()
                .then(videos => message.channel.send(videos[1].url));
                
            return null;
    
        } catch (err) {
            return message.channel.send(`No results found for **${s}**`)
        }
	}
}