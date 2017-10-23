const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = class MoeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'moe',
            aliases: ['awwnime', 'loli'],
            group: 'anime',
            memberName: 'moe',
            guildOnly: true,
            description: 'Cute anime girls!',
            examples: ['~moe'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
        try {  
            randomPuppy('awwnime')
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`awwnime`)
                        .setImage(url)
                        .setColor('#A187E0')
                    return message.channel.send({embed})
                })
    
            } catch(err) {
                message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that command!')
                return console.log(err)
        }
	}
}