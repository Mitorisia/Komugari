const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class EightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            aliases: ['8b', 'ball'],
            group: 'fun',
            memberName: '8ball',
            guildOnly: true,
            description: 'Ask the magic 8ball a question!',
            examples: ['~8ball [question]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run (message) {
      let question = message.content.split(/\s+/g).slice(1).join(" ");
      
        if (!question) {
          message.channel.send('You must provide a question!');
        }

        const res = await snekfetch.get(`https://8ball.delegator.com/magic/JSON/${question}`);
      
        if (!res || !res.body || !res.body.magic) {
          message.channel.send('Could not retrieve answer from 8-ball!');
        }
      
        try {
          const magic = res.body.magic;
            const embed = new Discord.MessageEmbed()
                .setAuthor(question, 'https://a.safe.moe/aKDHV.png')
                .setDescription(magic.answer + '.')
                .setColor('#646770');
          return message.channel.send({embed});
        
        } catch(err) {
          message.react('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658>');
          return console.log(err);
        }
	}
}