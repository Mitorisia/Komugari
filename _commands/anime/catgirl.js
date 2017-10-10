const snekfetch = require('snekfetch')

exports.run = async (client, message, Discord) => {
    const res = await snekfetch.get(`http://nekos.life/api/neko`)
    const preview = res.body.neko
        const embed = new Discord.MessageEmbed()
            .setImage(preview)
            .setColor('#A187E0')
            .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif')
    return message.channel.send({embed})
}