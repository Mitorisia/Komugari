const { Command } = require('../../commando');
const Discord = require('discord.js');
const { noSwearP } = require('../../assets/json/actions.json');


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

    run(message) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var noSwear = noSwearP[Math.round(Math.random() * (noSwearP.length - 1))];

        if (!recipient) {
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(noSwear);
            return message.channel.send(`**NO SWEARING! <:NOSWEARING:379103012007706624>**`, { embed: embed });

        } else {
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(noSwear);
            return message.channel.send(`${recipient}, NO SWEARING!`, { embed: embed });

        }
    }
}