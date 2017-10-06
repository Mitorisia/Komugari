exports.run = async (client, message, Discord, args) => {
    if(args.length < 1) {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username} has paid their respects.`, message.author.displayAvatarURL)
        .setColor('#4E373B')
        .setFooter(`Press F to pay your respects.`)
    return message.channel.send({embed}).then(m=>m.react("🇫"))
    } else {
        const respect = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.username} has paid their respects to ${respect}.`, message.author.displayAvatarURL)
            .setColor('#4E373B')
            .setFooter(`Press F to pay your respects.`)
        return message.channel.send({embed}).then(m=>m.react("🇫"))
    }
}