const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class BDSMCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bdsm',
            group: 'nsfw',
            memberName: 'bdsm',
            guildOnly: true,
            description: 'Finds....BDSM????? For you...!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~bdsm'],
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
            'bdsm',
            'bondage'
        ]

        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        try {
            randomPuppy(sub)
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`BDSM`)
                        .setImage(url)
                        .setColor('#A187E0');
                    return message.channel.send({embed});
                })
    
            } catch(err) {
                return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that function!');
        }
    }
}