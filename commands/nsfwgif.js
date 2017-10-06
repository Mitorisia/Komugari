const randomPuppy = require('random-puppy');

exports.run = async (client, message, Discord) => {
    var errMessage = client.consts.nsfwError[Math.round(Math.random() * (client.consts.nsfwError.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage).then(m => m.delete(5000));
        return message.react('✖')
    }
    
    var randSubreddit = client.consts.nsfwGifSubreddits[Math.round(Math.random() * (client.consts.nsfwGifSubreddits.length - 1))]
    randomPuppy(randSubreddit)
       .then(url => {
            const embed = new Discord.RichEmbed()
                .setFooter('NSFW.gif', 'https://a.safe.moe/O8TDd.png')
                .setImage(url)
                .setColor('#CEA0A6')
            return message.channel.send({embed})
    })
}