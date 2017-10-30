const { Command } = require('../../commando');
const Discord = require('discord.js');
const got = require('got');

module.exports = class WeatherCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            group: 'utility',
            memberName: 'weather',
            guildOnly: true,
            description: 'Shows the weather for a specified location!',
            examples: ['~weather [location]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run(message) {
        const messageThing = message.content.split(/\s+/g).slice(1).join(" ");
        if (!messageThing) {
            return message.channel.send('Please provide a location.');
        }

        try {
            const city = message.content.split(/\s+/g).slice(1).join(" ");
            got(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
                .then(resp => {
                    let weatherinfo = JSON.parse(resp.body).query.results.channel;
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(weatherinfo.item.title)
                        .setColor('DFA661')
                        .setDescription(`The current temperature in ${weatherinfo.location.city} is ${weatherinfo.item.condition.temp}°F/${Math.round(((weatherinfo.item.condition.temp-32)*5)/9)}°C`)
                        .addField('Condition', weatherinfo.item.condition.text, true)
                        .addField('Humidity', weatherinfo.atmosphere.humidity + '%', true)
                        .addField(':wind_blowing_face: Wind', `*${weatherinfo.wind.speed}mph* ; direction: *${weatherinfo.wind.direction}°*`, true)
                        .addField(`Forecast for today is *${weatherinfo.item.forecast[0].text}*`, `Highest temp is ${weatherinfo.item.forecast[0].high}°F/${Math.round(((weatherinfo.item.forecast[0].high-32)*5)/9)}°C; Lowest temp is ${weatherinfo.item.forecast[0].low}°F/${Math.round(((weatherinfo.item.forecast[0].low-32)*5)/9)}°C`, true)
                        .addField('\u200B', '\u200B', true)
                        .addField(':sunrise: Sunrise', weatherinfo.astronomy.sunrise, true)
                        .addField(':city_sunset: Sunset', weatherinfo.astronomy.sunset, true);
                    return message.channel.send({ embed });
                })

        } catch (err) {
            return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that function!');
        }
    }
}