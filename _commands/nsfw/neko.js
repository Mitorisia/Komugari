const snekfetch = require('snekfetch')

exports.run = async (client, message, Discord) => {
    var errMessage = client.consts.nsfwError[Math.round(Math.random() * (client.consts.nsfwError.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage).then(m => m.delete(5000));
        message.react('✖')
    }

    try {
        const res = await snekfetch.get(`http://nekos.life/api/lewd/neko`)
        const preview = res.body.neko
            const embed = new Discord.MessageEmbed()
                .setImage(preview)
                .setColor('#A187E0')
                .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif')
            return message.channel.send({embed})
            
    } catch(err) {
        return message.react('✖')
    }
}