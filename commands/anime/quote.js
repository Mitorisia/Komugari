const aq = require('animequote');

exports.run = async (client, message, Discord) => {
    const embed = new Discord.RichEmbed()
        .setTitle(aq().quotecharacter)
        .setDescription(aq().quotesentence)
        .setFooter(aq().quoteanime)
        .setColor('#D2D779')
    return message.channel.send({embed})
}
