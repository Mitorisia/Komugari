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
                duration: 5
            }
        });
    }

    run (message) {
        var search = message.content.split(/\s+/g).slice(1).join(" ");
        
        if(!search) {
            return message.channel.send('Please provide me a manga to search for!');
        }

        kitsu.searchManga(search).then(result => {
            if (result.length === 0) {
                return message.channel.send(`No results found for **${search}**!`);  
            }

            var manga = result[0]

            var embed = new Discord.MessageEmbed()
            .setColor('#FF9D6E')
            .setAuthor(`${manga.titles.english}`, manga.posterImage.original)
            .setDescription(manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
            .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${manga.titles.romaji}\n\•\u2000\**Age Rating:** ${manga.ageRating ? manga.ageRating : '`N/A`'}\n\•\u2000\**Chapters:** ${manga.chapterCount ? manga.chapterCount : '`N/A`'}`, true)
            .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${manga.averageRating ? manga.averageRating : '`N/A`'}\n\•\u2000\**Rating Rank:** ${manga.ratingRank ? manga.ratingRank : '`N/A`'}\n\•\u2000\**Popularity Rank:** ${manga.popularityRank ? manga.popularityRank : '`N/A`'}`, true)
            .addField('❯\u2000\Status', `•\u2000\**Volumes:** ${manga.volumeCount ? manga.volumeCount : '`N/A`'}\n\•\u2000\**Start Date:** ${manga.startDate}\n\•\u2000\**End Date:** ${manga.endDate ? manga.endDate : "Ongoing"}`, true)
            .setImage(manga.posterImage.original);
          return message.channel.send({embed});  

        }).catch(err => {
            console.log(err);
            return message.channel.send(`No results found for **${search}**!`)
        })
	}
}