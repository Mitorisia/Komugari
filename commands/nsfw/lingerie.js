const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class LingerieCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lingerie',
            aliases: ['thighhighs', 'stockings'],
            group: 'nsfw',
            memberName: 'lingerie',
            guildOnly: true,
            description: 'Finds...girls wearing..lingerie? ...For you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~'],
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
        
        var subreddits = [
            'lingerie',
            'stockings',
            'pantyfetish',
            'panties'
        ]

        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`Lingerie`)
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({embed});
            })
        }
}