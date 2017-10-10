var randomHex = require('random-hex');

exports.run = async(client, message, Discord, args) => {
  var color = args.join(" ");
  
  if(!color){
    var genColour = randomHex.generate();
    const embed = new Discord.MessageEmbed()
      .setColor(genColour)
      .setDescription(genColour)
    return message.channel.send('Here\'s your color!', {embed: embed});
  }

  if (((color.indexOf("#") === 0) && color.length === 7) || (!isNaN(color) && color.length <= 8 && color < 16777215)) {
    const embed = await new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(color);
    return message.channel.send({embed});
  } else {
    let m = await message.channel.send("Invalid Parameters!");
    m.delete(2000);
  }
};