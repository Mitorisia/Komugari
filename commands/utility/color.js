const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var randomHex = require('random-hex');

module.exports = class ColorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'color',
            aliases: ['colour', 'hex'],
            group: 'utility',
            memberName: 'color',
            guildOnly: true,
            description: 'Shows a random color or a preview of the given color!',
            examples: ['~color <color>']
        });
    }

    async run (message) {
      var color = message.content.split(/\s+/g).slice(1).join(" ");
      
      if(!color){
        var genColour = randomHex.generate();
        const embed = new Discord.MessageEmbed()
          .setColor(genColour)
          .setImage(`https://dummyimage.com/50/${genColour.slice(1)}/&text=%20`)
          .setFooter(genColour);
        return message.channel.send('Here\'s your color!', {embed: embed});
      }
    
      if (((color.indexOf("#") === 0) && color.length === 7) || (!isNaN(color) && color.length <= 8 && color < 16777215)) {
        const embed = await new Discord.MessageEmbed()
          .setColor(color)
          .setImage(`https://dummyimage.com/50/${color.slice(1)}/&text=%20`)
          .setFooter(color);
        return message.channel.send({embed});

      } else {
        return message.channel.send("Invalid Parameters!");
      }
	}
}