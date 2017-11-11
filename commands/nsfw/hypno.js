const { Command } = require('../../commando');
const Discord = require('discord.js');
const booru = require('booru');
const errors = require('../../assets/json/errors');


module.exports = class HypnoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hypno',
            aliases: ['hypnohub', 'hh'],
            group: 'nsfw',
            memberName: 'hypno',
            guildOnly: true,
            description: 'Searches for images on Hypnohub!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~hypno <search>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

        var query = message.content.split(/\s+/g).slice(1).join(" ");
        booru.search('hh', [query], { limit: 1, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`Hypnohub ${query}`, 'https://a.safe.moe/ppHw0.png')
                        .setDescription(`[Image URL](${image.common.file_url})`)
                        .setImage(image.common.file_url)
                        .setColor('#E89F3E');
                    message.channel.send({ embed });
                    message.channel.send(image.common.file_url)
                }
            }).catch(err => {
                if (err.name === 'booruError') {
                    return message.channel.send(`No results found for **${query}**!`);
                } else {
                    return message.channel.send(`No results found for **${query}**!`);
                }
            })
    }
}