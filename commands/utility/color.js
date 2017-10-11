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
            description: 'Shows a random color or a preview of the given color!',
            examples: ['~color <color>']
        });
    }

    async run (message) {
      var color = args.join(" ");
      
      if(!color){
        var genColour = randomHex.generate();
        const embed = new Discord.MessageEmbed()
          .setColor(genColour)
          .setDescription(genColour);
        return message.channel.send('Here\'s your color!', {embed: embed});
      }
    
      if (((color.indexOf("#") === 0) && color.length === 7) || (!isNaN(color) && color.length <= 8 && color < 16777215)) {
        const embed = await new Discord.MessageEmbed()
          .setColor(color)
          .setDescription(color);
        return message.channel.send({embed});

      } else {
        return message.channel.send("Invalid Parameters!");
      }
	}
}