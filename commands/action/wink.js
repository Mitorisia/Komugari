const { Command } = require('../../commando');
const Discord = require('discord.js');
const { winkP } = require('../../assets/json/actions.json');


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

    run(message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var wink = winkP[Math.round(Math.random() * (winkP.length - 1))]

        if (!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(wink);
            return message.channel.send(`You can't wink at.... yourself, but I'll wink at.. you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(wink);
            return message.channel.send(`You can't wink at.... yourself, but I'll wink at.. you, ${message.author}!`, { embed: embed });
                
        } else if (message.mentions.users.first() == this.client.user) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(wink);
            return message.channel.send(`(´ω｀*) Y-Yes?`, { embed: embed });

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(wink);
            return message.channel.send(`${message.author} winks ${recipient}!`, { embed: embed });
        }
    }
}