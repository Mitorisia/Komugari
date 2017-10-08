//please don't steal that password, i'm too lazy to hide it, think of the people,,, thank u for your time
var aq = require('animequote')
var request = require('request');

exports.run = (client, message, Discord, args) => {

    var tag = args.join('+');
    request(`https://myanimelist.net/api/anime/search.xml?q=${tag}`, function (error, response, body) {
      if (error!=null) {
        message.channel.send(`**ERROR:** Could not find any matches on MyAnimeList`);
      } else {
        const parseString = require('xml2js').parseString;
        parseString(body, function (err, result) {
            const decode = require('he').decode;
            var anime = result.anime.entry[0];
            message.channel.send({embed:new Discord.RichEmbed()
              .setAuthor(anime.title[0], 'https://myanimelist.cdn-dena.com/img/sp/icon/apple-touch-icon-256.png')
              .setImage(anime.image[0])
              .addField(`English Title:`,`${anime.english[0]!='' ? anime.english[0] : '­'}`,true)
              .addField(`Episodes:`,`${anime.episodes[0]!='' ? anime.episodes[0] : '­'}`,true)
              .addField(`Start Date:`,`${anime.start_date[0]!='' ? anime.start_date[0] : '­'}`,true)
              .addField(`External Link:`,`${anime.id[0]!='' ? `[MyAnimeList](https://myanimelist.net/anime/${anime.id[0]})` : '­'}`,true)
              .addField(`Score:`,`${anime.score[0]!='' ? anime.score[0] : '­'}`,true)
              .addField(`End Date:`,`${anime.end_date[0]!='' ? anime.end_date[0] : '­'}`,true)
              .setDescription(decode(anime.synopsis[0].replace(/<[^>]*>/g, '')).split('\n')[0])
              .setColor('#FF9D6E')});
        });
      }
    }).auth('aawew', '3q3qokguys');
}


