const snekfetch = require('snekfetch');

exports.run = async (client, message, Discord, args) => {
    var sign = message.content.split(/\s+/g)[1]
    const text = await snekfetch
        .get(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`);
    const body = JSON.parse(text.body);

    try{
        const embed = new Discord.RichEmbed()
            .setAuthor(`Horoscope for ${body.sunsign} on ${body.date}`, 'http://images.indianexpress.com/2017/01/zodiac-love-2017-main_820_thinkstockphotos-481896132.jpg?w=820')
            .setDescription(body.horoscope)
            .setTimestamp()
            .setFooter(`${message.author.username}'s Horoscope`)
            .addField('Mood', body.meta.mood, true)
            .addField("Intensity", body.meta.intensity, true)
        return message.channel.send({embed})

    } catch(err) {
        console.log(err)
        return message.react('✖')
    }
}
