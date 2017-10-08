const randomPuppy = require('random-puppy')

exports.run = async (client, message, Discord, args) => {
    function selfPat() {
        var rand = [];
        return rand[Math.floor(Math.random() * rand.length)];
    } 

    if(args.length < 1) {
        const embed = new Discord.RichEmbed()
            .setColor('#4E373B')
            .setImage(selfPat())
        return message.channel.send(`${message.author} pats... themselves..?`, {embed: embed})
        
    } else {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        randomPuppy('headpats')
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setColor('#4E373B')
                    .setImage(url)
                return message.channel.send(`${message.author} pats ${recipient}!`, {embed: embed})
            })
        }
}