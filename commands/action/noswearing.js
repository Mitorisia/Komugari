const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');


module.exports = class PoutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'noswearing',
            aliases: ['sorrysir', 'noswear'],
            group: 'action',
            memberName: 'noswearing',
            guildOnly: true,
            description: 'Sorry sir no swearing in my Christian Minecraft server',
            examples: ['~wink <mention>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");        
        if(!recipient) {    
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.noSwearP[Math.round(Math.random() * (actions.noSwearP.length - 1))]);
            return message.channel.send(`NO SWEARING!`, {embed: embed});

        } else {
    
            var recipient = message.content.split(/\s+/g).slice(1).join(" ");
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.noSwearP[Math.round(Math.random() * (actions.noSwearP.length - 1))]);
            return message.channel.send(`${recipient}, NO SWEARING!`, {embed:embed});
    
        }       
    }   
}
