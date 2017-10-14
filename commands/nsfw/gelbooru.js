const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const booru = require('booru');
const errors = require('../../assets/json/errors');


module.exports = class GelbooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gelbooru',
            aliases: ['gb'],
            group: 'nsfw',
            memberName: 'gelbooru',
            guildOnly: true,
            description: 'Searches for images on Gelbooru!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~gelbooru <search>'],
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
        
         var query = message.content.split(/\s+/g).slice(1).join(" ");
            booru.search('gelbooru', [query], {limit: 1, random: true})
             .then(booru.commonfy)
             .then(images => {
                 for(let image of images) {
                     const embed = new Discord.MessageEmbed()
                        .setAuthor(`Gelbooru **${query}**`, 'https://a.safe.moe/ppHw0.png')
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