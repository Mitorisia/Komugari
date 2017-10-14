const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var aq = require('animequote');
const Anime = require('malapi').Anime;
const decode = require('he').decode;

module.exports = class AnimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anime',
            group: 'anime',
            memberName: 'anime',
            guildOnly: true,
            description: 'Searches for an anime on MyAnimeList!',
            examples: ['~anime <anime name>'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
      var search = message.content.split(/\s+/g).slice(1).join(" ");
      if(!search) {
        Anime.fromName(aq().quoteanime).then(anime => {
          var embed = new Discord.MessageEmbed()
            .setColor('#FF9D6E')
            .setAuthor(`${anime.title} | ${anime.type}`, 'https://myanimelist.cdn-dena.com/img/sp/icon/apple-touch-icon-256.png')
            .setDescription(decode(anime.synopsis.replace(/<[^>]*>/g, '')).split('\n')[0])
            .addField(`Classification:`, anime.classification, true)
            .addField(`Episodes:`, anime.episodes, true)
            .addField(`Status:`, anime.status, true)
            .addField(`External Link:`, `[MyAnimeList](${anime.detailsLink})`, true)
            .addField(`Score:`, anime.statistics.score.value, true)
            .addField(`Aired:`, anime.aired, true)
            .setImage(anime.image)
            .setFooter(`Popularity: ${anime.statistics.popularity}`);
          return message.channel.send(`Try watching **${anime.title}**!`, {embed: embed});
        });
  
      } else {
        var search = message.content.split(/\s+/g).slice(1).join(" ");
            Anime.fromName(search).then(anime => {
              var embed = new Discord.MessageEmbed()
                .setColor('#FF9D6E')
                .setAuthor(`${anime.title} | ${anime.type}`, 'https://myanimelist.cdn-dena.com/img/sp/icon/apple-touch-icon-256.png')
                .setDescription(decode(anime.synopsis.replace(/<[^>]*>/g, '')).split('\n')[0])
                .addField(`English Title:`, anime.alternativeTitles.english, true)
                .addField(`Episodes:`, anime.episodes, true)
                .addField(`Status:`, anime.status, true)
                .addField(`External Link:`, `[MyAnimeList](${anime.detailsLink})`, true)
                .addField(`Score:`, anime.statistics.score.value, true)
                .addField(`Aired:`, anime.aired, true)
                .setImage(anime.image)
                .setFooter(`Popularity: ${anime.statistics.popularity} | Say '~anime' to get an anime suggestion!`);
              return message.channel.send({embed});
              });
      }
	}
}