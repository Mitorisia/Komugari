const { Command } = require('discord.js-commando');
const Discord = require('discord.js');


module.exports = class EmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            group: 'info',
            memberName: 'emoji',
            description: 'Makes your given emoji bigger, or sends all your server emojis!',
            examples: ['~emoji <emoji>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run (message) {
        let emoji = message.content.split(/\s+/g).slice(1);

        if(!emoji) {
            const emojis = message.guild.emojis;
            if (!emojis.size) return message.channel.send('You have no custom emoji.');

            return message.channel.send(emojis.map(e => e).join(''));

        } else {
            parsed.split = emoji.join(' ').replace(/(<:\w+?:\d+?>)/g, '|$1|').split('|')
          
            if (parsed.split.length < 1) {
              return message.channel.send('You must enter at least one emoji!');
            }
          
            let files = parsed.split.map(a => {
              const emoji = this.client.emojis.find(e => e.toString() === a);
          
              if (!emoji) {
                return null;
              }
          
              return emoji;
            }).filter(e => e);
          
            files.length = Math.min(10, files.length);
            files = files.map(e => {
          
              return {
                attachment: e.url,
                name: `${e.name}-${e.id}.png`
              }
            })
          
            if (!files.length) {
              return message.channel.send('There was an error parsing the emojis!');
            }
          
            return message.channel.send(parsed.split.join(''), { files });
        }
        
	}
}