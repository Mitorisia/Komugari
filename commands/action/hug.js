exports.run = async (client, message, Discord, args) => {
    function selfHug() {
        var rand = ['http://i.imgur.com/gb1WjWB.gifv', 'http://i.imgur.com/eUNlj7M.gif'];
        return rand[Math.floor(Math.random() * rand.length)];
    } 

    if(args.length < 1) {
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(selfHug())
        return message.channel.send(`${message.author} hugs... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(client.consts.hugP[Math.round(Math.random() * (client.consts.hugP.length - 1))])
        return message.channel.send(`${message.author} hugs ${recipient}!`, {embed: embed})
        }
}

