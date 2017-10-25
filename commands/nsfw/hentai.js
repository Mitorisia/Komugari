const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');
const subreddits = require('../../assets/json/subreddits');


module.exports = class HentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hentai',
            group: 'nsfw',
            memberName: 'hentai',
            description: 'Finds hentai for you!',
            guildOnly: true,
            details: 'This command can only be used in NSFW channels!',
            examples: ['~hentai'],
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
    
        var randSubreddit = subreddits.hentaiSubreddits[Math.round(Math.random() * (subreddits.hentaiSubreddits.length - 1))];
        
        randomPuppy(randSubreddit)
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`${randSubreddit}`)
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({embed});
            })
	    }
}