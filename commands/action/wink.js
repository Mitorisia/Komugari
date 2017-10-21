const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');


//remember to return before every promise
module.exports = class PoutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wink',
            group: 'action',
            memberName: 'wink',
            guildOnly: true,
            description: 'Winks at the specified user!',
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
                .setImage(actions.winkP[Math.round(Math.random() * (actions.winkP.length - 1))]);
            return message.channel.send({embed});
    
        } else {
    
            var recipient = message.content.split(/\s+/g).slice(1).join(" ");
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.winkP[Math.round(Math.random() * (actions.winkP.length - 1))]);
            return message.channel.send(`${message.author} winks at ${recipient}!`, {embed:embed});
    
        }       
    }   
}
