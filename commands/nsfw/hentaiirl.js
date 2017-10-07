const randomPuppy = require('random-puppy');

exports.run = async (client, message, Discord) => {
    var errMessage = client.consts.nsfwError[Math.round(Math.random() * (client.consts.nsfwError.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage).then(m => m.delete(5000));
        return message.react('✖')
    }
    
    try {
        randomPuppy('hentai_irl')
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setFooter('Hentai_irl', 'https://a.safe.moe/jZZKM.png')
                    .setImage(url)
                    .setColor('#A187E0')
                return message.channel.send({embed})
            })
            
        } catch(err) {
            return message.react('✖')
        }
}