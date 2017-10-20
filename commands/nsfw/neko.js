const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');


module.exports = class NekoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'neko',
            group: 'nsfw',
            memberName: 'neko',
            guildOnly: true,
            description: 'Nekos!',
            details: 'This command is NSFW in NSFW channels and not NSFW in normal channels! Magic!',
            examples: ['~neko'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run (message) {
        if(!message.channel.nsfw) {
            const res = await snekfetch.get(`http://nekos.life/api/neko`);
            const preview = res.body.neko;
                const embed = new Discord.MessageEmbed()
                    .setImage(preview)
                    .setColor('#A187E0')
                    .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif');
            return message.channel.send({embed});
            
        } else {
    
            try {
                const res = await snekfetch.get(`http://nekos.life/api/lewd/neko`);
                const preview = res.body.neko;
                    const embed = new Discord.MessageEmbed()
                        .setImage(preview)
                        .setColor('#A187E0')
                        .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif');
                    return message.channel.send({embed});
                
                } catch(err) {
                    return message.channel.send('✖ Something went wrong while executing that function!');
                }
            }
        }
    }