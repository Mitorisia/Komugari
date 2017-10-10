exports.run = async (client, message, Discord, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor('#F2B8A4')
        .setImage(client.consts.disgustP[Math.round(Math.random() * (client.consts.disgustP.length - 1))])
    return message.channel.send({embed})
}