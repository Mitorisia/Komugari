const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class OppaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'oppai',
            aliases: ['tiddy', 'animetiddy'],
            group: 'nsfw',
            memberName: 'oppai',
            guildOnly: true,
            description: 'Finds oppai for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~oppai'],
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
        
        randomPuppy('OppaiLove')
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`oppai`)
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({embed});
            })

        }
}