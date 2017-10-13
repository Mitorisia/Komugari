const randomPuppy = require('random-puppy');

exports.run = async (client, message, Discord) => {
    var errMessage = errors[Math.round(Math.random() * (errors.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage)
        return message.react('💢')
    }
    
    try {
        randomPuppy('hentai_irl')
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter('Hentai_irl', 'https://a.safe.moe/jZZKM.png')
                    .setImage(url)
                    .setColor('#A187E0')
                return message.channel.send({embed})
            })
            
        } catch(err) {
            return message.react('✖')
        }
}

const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
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