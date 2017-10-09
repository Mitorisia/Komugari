exports.run = async (client, message, Discord, args) => {
    const embed = new Discord.RichEmbed()
        .setColor('#F2B8A4')
        .setImage(client.consts.lewdP[Math.round(Math.random() * (client.consts.lewdP.length - 1))])
    return message.channel.send('L-Lewd!', {embed: embed})
}