exports.run = async (client, message, Discord, args) => {
    function selfKiss() {
        var rand = [];
        return rand[Math.floor(Math.random() * rand.length)];
    } 

    if(args.length < 1) {
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(selfKiss())
        return message.channel.send(`${message.author} kisses... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(client.consts.kissP[Math.round(Math.random() * (client.consts.kissP.length - 1))])
        return message.channel.send(`${message.author} kisses ${recipient}!`, {embed: embed})
        }
}

