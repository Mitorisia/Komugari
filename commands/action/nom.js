const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const actions = require('../../assets/json/actions.json');

module.exports = class NomCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nom',
            aliases: ['eat', 'munch'],
            group: 'action',
            memberName: 'nom',
            guildOnly: true,
            description: 'Noms on the user you mentioned!',
            examples: ['~nom <user>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run (message) {
        if(args.length < 1) {
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.disgustP[Math.round(Math.random() * (actions.disgustP.length - 1))])
            return message.channel.send(`${message.author} noms on... themselves..?`, {embed: embed})
    
        } else if(message.mentions.users.first() == message.author) {
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(actions.disgustP[Math.round(Math.random() * (actions.disgustP.length - 1))])
            return message.channel.send(`${message.author} noms on... themselves..?`, {embed: embed})
            
        } else {
    
        var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=nom`);
        var body = JSON.parse(text.text);
    
        try{
            var recipient = message.content.split(/\s+/g).slice(1).join(" ");
            var embed = new Discord.MessageEmbed()
                .setColor('#FBCFCF')
                .setImage(`https://rra.ram.moe${body.path}`)
            return message.channel.send(`${message.author} noms on ${recipient}!`, {embed:embed})
    
        } catch(err) {
            console.log(err)
            message.react('✖')

            return null;
        }
    }
	}
}