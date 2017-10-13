const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');
const subreddits = require('../../assets/json/subreddits');

module.exports = class NSFWGifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nsfwgif',
            aliases: ['nsfwg', 'porngif'],
            group: 'nsfw',
            memberName: 'nsfwgif',
            description: 'Finds NSFW gifs for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~nsfwgif'],
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
        
        var randSubreddit = subreddits.nsfwGifSubreddits[Math.round(Math.random() * (subreddits.nsfwGifSubreddits.length - 1))];
    
        try {
            randomPuppy(randSubreddit)
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter('NSFW.gif', 'https://a.safe.moe/O8TDd.png')
                        .setImage(url)
                        .setColor('#CEA0A6');
                    return message.channel.send({embed});
                })
    
            } catch(err) {
                return message.channel.send('Something went wrong while executing that function!');
        }
	}
}