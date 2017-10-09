const snekfetch = require('snekfetch');

exports.run = async (client, message, Discord, args) => {
    if(args.length < 1) {
        var embed = new Discord.RichEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.disgustP[Math.round(Math.random() * (client.consts.disgustP.length - 1))])
        return message.channel.send(`${message.author} stares at... themselves..?`, {embed: embed})

    } else if(message.mentions.users.first() == message.author) {
        var embed = new Discord.RichEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.disgustP[Math.round(Math.random() * (client.consts.disgustP.length - 1))])
        return message.channel.send(`${message.author} stares at... themselves..?`, {embed: embed})
        
    } else {

    var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=stare`);
    var body = JSON.parse(text.text);

    try{
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var embed = new Discord.RichEmbed()
            .setColor('#F2B8A4')
            .setImage(`https://rra.ram.moe${body.path}`)
        return message.channel.send(`${message.author} stares at ${recipient}...`, {embed:embed})

    } catch(err) {
        console.log(err)
        return message.react('✖')
    }
}
}