const randomPuppy = require('random-puppy')

exports.run = async (client, message, Discord, args) => {
    if(args.length < 1) {
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage('https://media.tenor.com/images/c889116a54b04010fb82db2695348311/tenor.gif')
        return message.channel.send(`${message.author} pats... themselves..?`, {embed: embed})

    } else if(message.mentions.users.first() == message.author) {
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage('https://media.tenor.com/images/c889116a54b04010fb82db2695348311/tenor.gif')
        return message.channel.send(`${message.author} pats... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
                const embed = new Discord.MessageEmbed()
                    .setColor('#F2B8A4')
                    .setImage(client.consts.patP[Math.round(Math.random() * (client.consts.patP.length - 1))])
                return message.channel.send(`${message.author} pats ${recipient}!`, {embed: embed})
        }
}