const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const booru = require('booru');
const errors = require('../../assets/json/errors');


module.exports = class DanbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'danbooru',
            aliases: ['db'],
            group: 'nsfw',
            memberName: 'danbooru',
            guildOnly: true,
            description: 'Searches for images on Danbooru!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~danbooru <query>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))]
        if(!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }
        
         var query = message.content.split(/\s+/g).slice(1).join(" ");
            booru.search('danbooru', [query], {limit: 1, random: true})
             .then(booru.commonfy)
             .then(images => {
                 for(let image of images) {
                     const embed = new Discord.MessageEmbed()
                        .setAuthor(`Danbooru **${query}**`, 'https://a.safe.moe/ppHw0.png')
                        .setImage(image.common.file_url)
                        .setColor('#C597B8');
                     return message.channel.send({embed});
                 }
             }).catch(err => {
                 if(err.name === 'booruError') {
                     return message.channel.send(`No results found for **${query}**.`);
                 } else {
                     return message.channel.send(`No results found for **${query}**.`);
                 }
             })
	}
}