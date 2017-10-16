const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports = class MangaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'manga',
            group: 'anime',
            memberName: 'manga',
            description: 'Searches for a manga with Kitsu.io!',
            examples: ['~manga [manga name]'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    run (message) {
        var search = message.content.split(/\s+/g).slice(1).join(" ");
        
        if(!search) {
            return message.channel.send('Please provide me a manga to search for!');
        }

        kitsu.searchManga(search).then(result => {
                console.log(result[0])
                console.log(result[0].name)
            })
            .catch(err => console.error(err));
	}
}