const got = require('got');

exports.run = function (client, message, Discord, args) {
    if(args.length < 1) {
        return message.channel.send('Please provide a location.');
    }
        const city = message.content.split(/\s+/g).slice(1).join(" ");
        got(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
        .then(resp => {
          let weatherinfo = JSON.parse(resp.body).query.results.channel;
          const embed = new Discord.RichEmbed()
            .setAuthor(weatherinfo.item.title)
            .setColor('DFA661')
            .setDescription(`The current temperature in ${weatherinfo.location.city} is ${weatherinfo.item.condition.temp}°F/${Math.round(((weatherinfo.item.condition.temp-32)*5)/9)}°C`)
            .addField('Condition',weatherinfo.item.condition.text, true)
            .addField('Humidity', weatherinfo.atmosphere.humidity + '%', true)
            .addField(':wind_blowing_face: Wind', `*${weatherinfo.wind.speed}mph* ; direction: *${weatherinfo.wind.direction}°*`, true)
            .addField(`Forecast for today is *${weatherinfo.item.forecast[0].text}*`, `Highest temp is ${weatherinfo.item.forecast[0].high}°F/${Math.round(((weatherinfo.item.forecast[0].high-32)*5)/9)}°C; Lowest temp is ${weatherinfo.item.forecast[0].low}°F/${Math.round(((weatherinfo.item.forecast[0].low-32)*5)/9)}°C`, true)
            .addField('\u200B', '\u200B', true)
            .addField(':sunrise: Sunrise', weatherinfo.astronomy.sunrise, true)
            .addField(':city_sunset: Sunset', weatherinfo.astronomy.sunset, true)
        message.channel.send({embed});
     })
};