const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class PaizuriCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'paizuri',
            group: 'nsfw',
            memberName: 'paizuri',
            guildOnly: true,
            description: 'Anime tiddy fuck...?',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~paizuri'],
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
            randomPuppy('Paizuri')
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`paizuri`)
                        .setImage(url)
                        .setColor('#A187E0');
                    return message.channel.send({embed});
                })
    
            } catch(err) {
                return message.channel.send('Something went wrong while executing that function!');
        }
    }
}