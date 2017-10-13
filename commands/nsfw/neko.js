const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const errors = require('../../assets/json/errors');


module.exports = class NekoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'neko',
            group: 'nsfw',
            memberName: 'neko',
            description: 'Lewd nekos!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~neko'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run (message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if(!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }
    
        try {
            const res = await snekfetch.get(`http://nekos.life/api/lewd/neko`);
            const preview = res.body.neko;
                const embed = new Discord.MessageEmbed()
                    .setImage(preview)
                    .setColor('#A187E0')
                    .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif');
                return message.channel.send({embed});
                
        } catch(err) {
            return message.channel.send('Something went wrong while executing that function!');
        }
	}
}