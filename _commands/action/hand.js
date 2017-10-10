exports.run = async (client, message, Discord, args) => {
    if(args.length < 1) {
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.disgustP[Math.round(Math.random() * (client.consts.disgustP.length - 1))])
        return message.channel.send(`${message.author} holds hands with... themselves..?`, {embed: embed})

    } else if(message.mentions.users.first() == message.author) {
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.disgustP[Math.round(Math.random() * (client.consts.disgustP.length - 1))])
        return message.channel.send(`${message.author} holds hands with... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.handP[Math.round(Math.random() * (client.consts.handP.length - 1))])
        return message.channel.send(`${message.author} holds hands with ${recipient}!`, {embed: embed})
        }
}

