const randomPuppy = require('random-puppy')

exports.run = (client, message, Discord) => {
    var errMessage = client.consts.nsfwError[Math.round(Math.random() * (client.consts.nsfwError.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage).then(m => m.delete(5000));
        return message.react('✖')
    }
    
    var randSubreddit = client.consts.nsfwSubreddits[Math.round(Math.random() * (client.consts.nsfwSubreddits.length - 1))]

    try {
        randomPuppy(randSubreddit)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setFooter(`r/${randSubreddit}`)
                    .setImage(url)
                    .setColor('#CEA0A6')
                return message.channel.send({embed})
            })
            
        } catch(err) {
            return message.react('✖')
    }
}