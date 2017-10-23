const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class YaoiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yaoi',
            aliases: ['bl'],
            group: 'nsfw',
            memberName: 'yaoi',
            guildOnly: true,
            description: 'Finds yaoi for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~yaoi'],
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
        
        try {
            randomPuppy('yaoi')
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`yaoi`)
                        .setImage(url)
                        .setColor('#A187E0');
                    return message.channel.send({embed});
                })
    
            } catch(err) {
                return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that function!');
        }
    }
}