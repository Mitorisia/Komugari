const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');


module.exports = class EcchiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ecchi',
            group: 'nsfw',
            memberName: 'ecchi',
            guildOnly: true,
            description: 'Finds ecchi for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~ecchi'],
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

        randomPuppy('ecchi')
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`ecchi`)
                    .setDescription(`[Image URL](${url})`)   
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({ embed });
            })
    }
}