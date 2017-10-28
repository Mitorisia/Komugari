const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');
const subreddits = [
    "nsfw",
    "porn",
    "BonerMaterial",
    "adorableporn",
    "nsfw2",
    "Sexy",
    "NSFW_nospam"
]


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
        
        var randSubreddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

         randomPuppy(randSubreddit)
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`${randSubreddit}`)
                    .setImage(url)
                    .setColor('#CEA0A6');
                return message.channel.send({embed});
            })
	    }
}