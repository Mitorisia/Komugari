const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');


module.exports = class EightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'advice',
            group: 'fun',
            memberName: 'advice',
            guildOnly: true,
            description: 'Get some advice!',
            examples: ['~advice'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run (message) {
        var res = await snekfetch.get("http://api.adviceslip.com/advice");
        
        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Here's a dad joke!`, 'https://a.safe.moe/X1gKJ.png')
                .setDescription(joke.body.joke)
                .setColor('#727684');
          return message.channel.send({embed});
        
        } catch(err) {
          message.react('✖');
          return message.channel.send(`Consult your dad! My API isn't working!`)
        }
	}
}

exports.run = async (client, msg) => {
    const snek = require("snekfetch");
    const joek = await snek
      .get("https://icanhazdadjoke.com/")
      .set("Accept", "application/json");
    msg.channel.send(joek.body.joke);
  };

  