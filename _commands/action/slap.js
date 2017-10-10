exports.run = async (client, message, Discord, args) => {
    function selfSlap() {
        var rand = ['http://cdn.awwni.me/mz98.gif', 'https://media.giphy.com/media/UxFtCk3f62uGI/200.gif'];
        return rand[Math.floor(Math.random() * rand.length)];
    } 

    if(args.length < 1) {
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(selfSlap())
        return message.channel.send(`${message.author} slaps... themselves..?`, {embed: embed})

    } else if(message.mentions.users.first() == message.author) {
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(selfSlap())
        return message.channel.send(`${message.author} slaps... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.slapP[Math.round(Math.random() * (client.consts.slapP.length - 1))])
        return message.channel.send(`${message.author} slaps ${recipient}!`, {embed: embed})
        }
}

