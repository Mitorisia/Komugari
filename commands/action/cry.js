exports.run = async (client, message, Discord, args) => {
    const embed = new Discord.RichEmbed()
        .setColor('#F2B8A4')
        .setImage(client.consts.cryP[Math.round(Math.random() * (client.consts.cryP.length - 1))])
    return message.channel.send(`${message.author} has started crying!`, {embed: embed})
}