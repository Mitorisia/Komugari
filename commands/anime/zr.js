const { Command } = require('../../commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

//remember to return before every promise
module.exports = class ZrCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'zr',
            aliases: ['zettairyouiki'],
            group: 'anime',
            memberName: 'zr',
            guildOnly: true,
            description: '"Absolute Territory" (絶対領域, zettai ryouiki) describes the amount of bare thigh skin between the skirt and stockings or socks for female characters.',
            examples: ['~zr'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        try {
            randomPuppy('ZettaiRyouiki')
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setFooter(`ZettaiRyouiki`)
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