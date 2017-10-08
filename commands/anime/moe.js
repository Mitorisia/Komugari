const randomPuppy = require('random-puppy')

exports.run = (client, message, Discord) => {  
    try {  
        randomPuppy('awwnime')
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setFooter(`awwnime`)
                    .setImage(url)
                    .setColor('#A187E0')
                return message.channel.send({embed})
            })

        } catch(err) {
            return message.react('✖')
    }
}