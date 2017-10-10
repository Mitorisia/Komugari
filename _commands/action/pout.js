const snekfetch = require('snekfetch');

exports.run = async (client, message, Discord, args) => {
    if(args.length < 1) {
        var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=pout`);
        var body = JSON.parse(text.text);

        var embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(`https://rra.ram.moe${body.path}`)
        return message.channel.send(`${message.author} has started pouting!`, {embed: embed})

    } else {

    var text = await snekfetch.get(`https://rra.ram.moe/i/r?type=pout`);
    var body = JSON.parse(text.text);

    try{
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(`https://rra.ram.moe${body.path}`)
        return message.channel.send(`${message.author} pouts at ${recipient}!`, {embed:embed})

    } catch(err) {
        console.log(err)
        return message.react('✖')
    }
}
}