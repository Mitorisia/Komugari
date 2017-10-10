const randomPuppy = require('random-puppy')

exports.run = (client, message, Discord) => {
    try {
    randomPuppy('ZettaiRyouiki')
        .then(url => {
            const embed = new Discord.MessageEmbed()
                .setFooter(`ZettaiRyouiki`)
                .setImage(url)
                .setColor('#A187E0')
            return message.channel.send({embed})
        })
        
    } catch(err) {
        return message.react('✖')
    }
}