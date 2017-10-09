exports.run = async (client, message, Discord, args) => {
    if(args.length < 1) {
        const embed = new Discord.RichEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.nobullyP[Math.round(Math.random() * (client.consts.nobullyP.length - 1))])
        return message.channel.send({embed: embed})

    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.nobullyP[Math.round(Math.random() * (client.consts.nobullyP.length - 1))])
        return message.channel.send(`${recipient}, stop bullying!`, {embed: embed})
        }
}