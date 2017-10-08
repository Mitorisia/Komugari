exports.run = async (client, message, Discord, args) => {
    function selfHand() {
        var rand = [];
        return rand[Math.floor(Math.random() * rand.length)];
    } 

    if(args.length < 1) {
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(selfHand())
        return message.channel.send(`${message.author} holds hands with... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(client.consts.handP[Math.round(Math.random() * (client.consts.handP.length - 1))])
        return message.channel.send(`${message.author} holds hands with ${recipient}!`, {embed: embed})
        }
}

