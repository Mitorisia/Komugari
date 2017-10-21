const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const subreddits = require('../../assets/json/subreddits.json');

module.exports = class MemeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'meme',
            group: 'fun',
            memberName: 'meme',
            guildOnly: true,
            description: 'Sends a random meme from selected subreddits!',
            examples: ['~meme'],
            details: "There is no NSFW filter on this! \n\If there is an NSFW meme, please remove it by reacting with a '🎴' emoji!",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    run (message) {
        var randSubreddit = subreddits.memeSubreddits[Math.round(Math.random() * (subreddits.memeSubreddits.length - 1))];
        try {
            randomPuppy(randSubreddit)
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`${randSubreddit}`)
                        .setImage(url)
                        .setColor('#887064');
                    return message.channel.send({embed});
            })
            
        } catch(err) {
            message.react('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658>');
            return console.log(err);
        }
	}
}