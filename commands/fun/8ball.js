const { Command } = require('../../commando');
const Discord = require('discord.js');
const answer = require('../../assets/json/eightball.json')


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
                duration: 3
            }
        });
    }

    run (message) {
        let question = message.content.split(/\s+/g).slice(1).join(" ");
      
        if (!question) {
          message.channel.send('You must provide a question!');
        }
      
        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(question, 'https://a.safe.moe/aKDHV.png')
                .setDescription(answer[Math.round(Math.random() * (answer.length - 1))] + '.')
                .setColor('#646770');
          return message.channel.send({embed});
        
        } catch(err) {
          
          return console.log(err);
        }
	}
}