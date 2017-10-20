const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class FourKNSFWCommand extends Command {
    constructor(client) {
        super(client, {
            name: '4knsfw',
            aliases: ['hdnsfw', 'hqnsfw'],
            group: 'nsfw',
            memberName: '4knsfw',
            guildOnly: true,
            description: 'Finds high quality NSFW content for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~4knsfw'],
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
            'NSFW_Wallpapers',
            'SexyWallpapers',
            'HighResNSFW',
            'nsfw_hd',
            'UHDnsfw'
        ]

        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        try {
            randomPuppy(sub)
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`4kNSFW`)
                        .setImage(url)
                        .setColor('#A187E0');
                    return message.channel.send({embed});
                })
    
            } catch(err) {
                return message.channel.send('✖ Something went wrong while executing that function!');
        }
    }
}