const randomPuppy = require('random-puppy')

exports.run = (client, message, Discord) => {
    var randSubreddit = client.consts.memeSubreddits[Math.round(Math.random() * (client.consts.memeSubreddits.length - 1))]
    randomPuppy(randSubreddit)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setFooter(`r/${randSubreddit}`)
                .setImage(url)
                .setColor('#887064')
            message.channel.send({embed})
        })
}