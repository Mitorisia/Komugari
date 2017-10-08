exports.run = async (client, message, Discord, args) => {
    function selfSlap() {
        var rand = [];
        return rand[Math.floor(Math.random() * rand.length)];
    } 

    if(args.length < 1) {
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(selfSlap())
        return message.channel.send(`${message.author} slaps... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(client.consts.slapP[Math.round(Math.random() * (client.consts.slapP.length - 1))])
        return message.channel.send(`${message.author} slaps ${recipient}!`, {embed: embed})
        }
}

