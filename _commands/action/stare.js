const snekfetch = require('snekfetch');

exports.run = async (client, message, Discord, args) => {
    if(args.length < 1) {
        var embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(client.consts.disgustP[Math.round(Math.random() * (client.consts.disgustP.length - 1))])
        return message.channel.send(`${message.author} stares at... themselves..?`, {embed: embed})

    } else if(message.mentions.users.first() == message.author) {
        var embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(client.consts.disgustP[Math.round(Math.random() * (client.consts.disgustP.length - 1))])
        return message.channel.send(`${message.author} stares at... themselves..?`, {embed: embed})
        
    } else {

    var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=stare`);
    var body = JSON.parse(text.text);

    try{
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var embed = new Discord.MessageEmbed()
            .setColor('#FBCFCF')
            .setImage(`https://rra.ram.moe${body.path}`)
        return message.channel.send(`${message.author} stares at ${recipient}...`, {embed:embed})

    } catch(err) {
        console.log(err)
        return message.react('✖')
    }
}
}

const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

//remember to return before every promise
module.exports = class /*CommandName*/Command extends Command {
    constructor(client) {
        super(client, {
            name: '',
            aliases: ['', ''],
            group: '',
            memberName: '',
            description: '',
            examples: [''],
            throttling: {
                usages: 0,
                duration: 0
            }
        });
    }

    run (message) {
        //code here
	}
}