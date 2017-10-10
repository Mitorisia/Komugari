const randomPuppy = require('random-puppy')

exports.run = (client, message, Discord) => {
    var errMessage = client.consts.nsfwError[Math.round(Math.random() * (client.consts.nsfwError.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage).then(m => m.delete(5000));
        return message.react('✖')
    }

    var randSubreddit = client.consts.hentaiSubreddits[Math.round(Math.random() * (client.consts.hentaiSubreddits.length - 1))]
    
    try {
        randomPuppy(randSubreddit)
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`${randSubreddit}`)
                    .setImage(url)
                    .setColor('#A187E0')
                return message.channel.send({embed})
            })

        } catch(err) {
            return message.react('✖')
        }
}