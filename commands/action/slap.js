const { Command } = require('../../commando');
const Discord = require('discord.js');
const { slapP } = require('../../assets/json/actions.json');

module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            aliases: ['punch', 'hit', 'punish'],
            group: 'action',
            memberName: 'slap',
            guildOnly: true,
            description: 'Slaps the user you mentioned!',
            examples: ['~slap <user>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        function selfSlap() {
            var rand = ['http://cdn.awwni.me/mz98.gif', 'https://media.giphy.com/media/UxFtCk3f62uGI/200.gif'];
            return rand[Math.floor(Math.random() * rand.length - 1)];
        }

        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var slap = slapP[Math.round(Math.random() * (slapP.length - 1))];

        if (!recipient) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(selfSlap());
            return message.channel.send(`${message.author}, please don't slap yourself!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(selfSlap());
            return message.channel.send(`${message.author}, please don't slap yourself!`, { embed: embed });

        } else if (message.mentions.users.first() == this.client.user) {
            return message.channel.send(`(；︿ ；✿) I-I'm sorry.. please d-don't slap me...`, { embed: embed });

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(slap);
            return message.channel.send(`${message.author} slaps ${recipient}!`, { embed: embed });
        }
    }
}