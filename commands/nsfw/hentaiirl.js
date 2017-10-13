const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

module.exports = class HentaiIrlCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hentaiirl',
            aliases: ['irl', 'hirl'],
            group: 'nsfw',
            memberName: 'hentaiirl',
            description: 'Hentai! But depicts of real situations!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~hentaiirl'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if(!message.channel.nsfw) {
            message.react('💢')
            return message.channel.send(errMessage);
        }
        
        try {
            randomPuppy('hentai_irl')
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter('Hentai_irl', 'https://a.safe.moe/jZZKM.png')
                        .setImage(url)
                        .setColor('#A187E0');
                    return message.channel.send({embed});
                })
                
            } catch(err) {
                return message.react('✖');
            }
	}
}