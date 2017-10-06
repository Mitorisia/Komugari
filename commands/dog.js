const snekfetch = require('snekfetch')

exports.run = async (client, message, Discord) => {
    const res = await snekfetch.get('https://random.dog/woof.json')
    const image = res.body.url

    const embed = new Discord.RichEmbed()
        .setImage(image)
        .setFooter('http://www.random.dog ©', 'https://random.dog/3f62f2c1-e0cb-4077-8cd9-1ca76bfe98d5.jpg')
        .setColor('#71A3BE')
    message.channel.send({embed})
}