exports.run = async (client, message, Discord, args) => {
    function selfCuddle() {
        var rand = [];
        return rand[Math.floor(Math.random() * rand.length)];
    } 

    if(args.length < 1) {
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(selfCuddle())
        return message.channel.send(`${message.author} cuddles... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(client.consts.cuddleP[Math.round(Math.random() * (client.consts.cuddleP.length - 1))])
        return message.channel.send(`${message.author} cuddles with ${recipient}!`, {embed: embed})
        }
}

