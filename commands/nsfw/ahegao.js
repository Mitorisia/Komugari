const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class AhegaoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ahegao',
            group: 'nsfw',
            memberName: 'ahegao',
            guildOnly: true,
            description: 'Finds ahegao for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~ahegao'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        randomPuppy('ahegao')
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`ahegao`)
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({ embed });
            })
    }
}