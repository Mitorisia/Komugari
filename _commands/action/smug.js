exports.run = (client, message, Discord) => {
    var randomNumber = Math.floor(Math.random() * 58) + 1  
    const embed = new Discord.MessageEmbed()
        .setImage(`http://smug.moe/smg/${randomNumber}.png`)
        .setColor('#9D9DBD')
    message.channel.send({embed})
}