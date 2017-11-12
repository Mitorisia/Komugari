const { Command } = require('../../commando');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class LewdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lewd',
            aliases: ['thatslewd'],
            group: 'action',
            memberName: 'lewd',
            guildOnly: true,
            description: 'That\'s lewd!',
            examples: ['~lewd'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        const embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(actions.lewdP[Math.round(Math.random() * (actions.lewdP.length - 1))]);
        return message.channel.send('L-Lewd!', { embed: embed });
    }
}