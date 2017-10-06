const randomPuppy = require('random-puppy')

exports.run = (client, message, Discord) => {    
    randomPuppy('awwnime')
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setFooter(`r/awwnime`)
                .setImage(url)
                .setColor('#A187E0')
            return message.channel.send({embed})
        })
}