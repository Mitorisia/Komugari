const { Command } = require('../../commando');
const Discord = require('discord.js');
const booru = require('booru');
const errors = require('../../assets/json/errors');


module.exports = class YandereCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yandere',
            aliases: ['yd'],
            group: 'nsfw',
            memberName: 'yandere',
            guildOnly: true,
            description: 'Searches for images on Yandere!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~yandere <search>'],
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

        if(message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');        
        
        var query = message.content.split(/\s+/g).slice(1).join(" ");
    
            booru.search('yandere', [query], {limit: 1, random: true})
             .then(booru.commonfy)
             .then(images => {
                 for(let image of images) {
                     const embed = new Discord.MessageEmbed()
                        .setAuthor(`Yandere ${query}`, 'https://a.safe.moe/ppHw0.png')
                        .setImage(image.common.file_url)
                        .setColor('#E89F3E');
                     message.channel.send({embed});
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