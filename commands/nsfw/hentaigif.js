const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class HentaiGifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hentaigif',
            aliases: ['hgif'],
            group: 'nsfw',
            memberName: 'hentaigif',
            guildOnly: true,
            description: 'Finds hentai gifs for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~hentaigif'],
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
        
        randomPuppy('HENTAI_GIF')
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`hentai.gif`)
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({embed});
            })
        }
}