const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const signs = require('../../assets/json/horoscope');

module.exports = class HoroscopeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'horoscope',
            group: 'fun',
            memberName: 'horoscope',
            guildOnly: true,
            description: 'Gets your daily horoscope!',
            examples: ['~horoscope [sign]'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    async run (message, args) {
        const sign = message.content.split(/\s+/g).slice(1).join(" ");
        if(!sign) return message.channel.send("Please give me a sign to get the horoscope of!");

        if (!signs.includes(sign.toLowerCase())) return message.channel.send('That is not a valid sign!');

        const text = await snekfetch
            .get(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`);
        const body = JSON.parse(text.body);

        var horoscope = body.horoscope
        var replaced = horoscope.replace('(c) Kelli Fox, The Astrologer, http://new.theastrologer.com', "")
    
        try{
            const embed = new Discord.MessageEmbed()
                .setColor('#5D7B9D')
                .setAuthor(`Horoscope for ${body.sunsign} on ${body.date}`, 'http://images.indianexpress.com/2017/01/zodiac-love-2017-main_820_thinkstockphotos-481896132.jpg?w=820')
                .setDescription(replaced)
                .setTimestamp()
                .setFooter(`${message.author.username}'s Horoscope`)
                .addField('Mood', body.meta.mood, true)
                .addField("Intensity", body.meta.intensity, true);
            return message.channel.send({embed});
    
        } catch(err) {
            message.react('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658>');
            return console.log(err);
        }
	}
}