const booru = require('booru');

exports.run = (client, message, Discord, args) => {
    var errMessage = client.consts.nsfwError[Math.round(Math.random() * (client.consts.nsfwError.length - 1))]
    if(!message.channel.nsfw) {
        message.channel.send(errMessage)
        return message.react('✖')
    }
    
     var query = message.content.split(/\s+/g).slice(1).join(" ");
        booru.search('e621', [query], {limit: 1, random: true})
         .then(booru.commonfy)
         .then(images => {
             for(let image of images) {
                 const embed = new Discord.MessageEmbed()
                    .setAuthor(`e621 ${query}`, 'https://a.safe.moe/ppHw0.png')
                    .setImage(image.common.file_url)
                    .setColor('#C597B8')
                 message.channel.send({embed})
             }
         }).catch(err => {
             if(err.name === 'booruError') {
                 message.channel.send(`No results found for ${query}.`)
             } else {
                 message.channel.send(`No results found for ${query}.`)
             }
         })
}