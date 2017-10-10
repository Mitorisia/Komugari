exports.run = async (client, message, Discord, args) => {
    function selfHug() {
        var rand = ['http://i.imgur.com/gb1WjWB.gifv', 'http://i.imgur.com/eUNlj7M.gif', 'https://49.media.tumblr.com/tumblr_m7gn0eU5i41r568xco1_500.gif', 'https://s-media-cache-ak0.pinimg.com/originals/5e/82/f3/5e82f34a4248dbe7b24419d3d587d024.gif', 'http://imgs.inkfrog.com/pix/am13690/rongchangdbz_0001.jpg', 'http://i.imgur.com/psllHXI.gif', client.consts.disgustP[Math.round(Math.random() * (client.consts.disgustP.length - 1))]];
        return rand[Math.floor(Math.random() * rand.length)];
    } 

    if(args.length < 1) {
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(selfHug())
        return message.channel.send(`${message.author} hugs... themselves..?`, {embed: embed})
    
    }else if(message.mentions.users.first() == message.author) {
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(selfHug())
        return message.channel.send(`${message.author} hugs... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        const embed = new Discord.MessageEmbed()
            .setColor('#F2B8A4')
            .setImage(client.consts.hugP[Math.round(Math.random() * (client.consts.hugP.length - 1))])
        return message.channel.send(`${message.author} hugs ${recipient}!`, {embed: embed})
        }
}

