const snekfetch = require('snekfetch')

exports.run = async (client, message, Discord) => {
    var errMessage = client.consts.nsfwError[Math.round(Math.random() * (client.consts.nsfwError.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage).then(m => m.delete(5000));
        return message.react('✖')
    }
    
    const id = [Math.floor(Math.random() * 4923)]
    const res = await snekfetch.get(`http://api.obutts.ru/butts/${id}`)
    const preview = res.body[0]["PREVIEW".toLowerCase()]
    const image = `http://media.obutts.ru/${preview}`
        const embed = new Discord.MessageEmbed()
            .setFooter('http://obutts.ru/')
            .setImage(image)
            .setColor('#CEA0A6')
    return message.channel.send({embed})
}