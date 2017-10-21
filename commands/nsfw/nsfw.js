const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');
const subreddits = require('../../assets/json/subreddits');


module.exports = class NSFWCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nsfw',
            aliases: ['porn'],
            group: 'nsfw',
            memberName: 'nsfw',
            guildOnly: true,
            description: 'Finds porn for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~nsfw'],
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
        
        var randSubreddit = subreddits.nsfwSubreddits[Math.round(Math.random() * (subreddits.nsfwSubreddits.length - 1))];
    
        try {
            randomPuppy(randSubreddit)
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`${randSubreddit}`)
                        .setImage(url)
                        .setColor('#CEA0A6');
                    return message.channel.send({embed});
                })
                
            } catch(err) {
                return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that function!');
        }
	}
}