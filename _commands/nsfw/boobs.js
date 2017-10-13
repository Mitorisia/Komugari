const snekfetch = require('snekfetch')

exports.run = async (client, message, Discord) => {
    var errMessage = errors[Math.round(Math.random() * (errors.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage)
        return message.react('💢')
    }
    
    const id = [Math.floor(Math.random() * 10930)]
    const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`)
    const preview = res.body[0]["PREVIEW".toLowerCase()]
    const image = `http://media.oboobs.ru/${preview}`
        const embed = new Discord.MessageEmbed()
            .setFooter('http://oboobs.ru/')
            .setImage(image)
            .setColor('#CEA0A6')
    return message.channel.send({embed})
}

const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const errors = require('../../assets/json/errors');

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