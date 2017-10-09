const snekfetch = require('snekfetch');

exports.run = async (client, message, Discord, args) => {
    var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=nyan`);
    var body = JSON.parse(text.text);

    try{
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var embed = new Discord.RichEmbed()
            .setColor('#F2B8A4')
            .setImage(`https://rra.ram.moe${body.path}`)
        return message.channel.send(`Nya!`, {embed:embed})

    } catch(err) {
        console.log(err)
        return message.react('✖')
    }
}