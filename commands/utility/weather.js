const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const { stripIndents } = require('common-tags')

const WEATHER_THUMBS = [
    { icon: 'https://a.safe.moe/UexWE.png', regex: /partly (cloudy|sunny)/i },
    { icon: 'https://a.safe.moe/eqK5f.png', regex: /cloudy/i },
    { icon: 'https://a.safe.moe/TcGmr.png', regex: /clear|sunny/i },
    { icon: 'https://a.safe.moe/K2fJ5.png', regex: /thunderstorms/i },
    { icon: 'https://a.safe.moe/5TyRY.png', regex: /scattered showers/i },
    { icon: 'https://a.safe.moe/vGZkK.png', regex: /rain/i },
    { icon: 'https://a.safe.moe/Jyr5A.png', regex: /snow/g }
]

const WEATHER_ICONS = [
    { icon: '⛅', regex: /partly (cloudy|sunny)/i },
    { icon: '☁', regex: /cloudy/i },
    { icon: '☀', regex: /clear|sunny/i },
    { icon: '⛈', regex: /thunderstorms/i },
    { icon: '🌦', regex: /scattered showers/i },
    { icon: '🌧', regex: /rain/i },
    { icon: '🌨', regex: /snow/g }
]
const DAYS = {
    'Mon': 'Mon',
    'Tue': 'Tue',
    'Wed': 'Wed',
    'Thu': 'Thu',
    'Fri': 'Fri',
    'Sat': 'Sat',
    'Sun': 'Sun'
}

const EMOJIMAP = {
    a: ['🇦', '🅰'],
    b: ['🇧', '🅱'],
    c: '🇨',
    d: '🇩',
    e: '🇪',
    f: '🇫',
    g: '🇬',
    h: '🇭',
    i: ['🇮', 'ℹ'],
    j: '🇯',
    k: '🇰',
    l: '🇱',
    m: ['🇲', 'Ⓜ'],
    n: '🇳',
    o: ['🇴', '🅾'],
    p: ['🇵', '🅿'],
    q: '🇶',
    r: '🇷',
    s: '🇸',
    t: '🇹',
    u: '🇺',
    v: '🇻',
    w: '🇼',
    x: ['🇽', '❌'],
    y: '🇾',
    z: '🇿',
    0: '0⃣',
    1: '1⃣',
    2: '2⃣',
    3: '3⃣',
    4: '4⃣',
    5: '5⃣',
    6: '6⃣',
    7: '7⃣',
    8: '8⃣',
    9: '9⃣',
    '#': '#⃣',
    '*': '*⃣',
    '!': '❗',
    '?': '❓'
}

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
            },
            args: [{
                key: 'city',
                label: 'city',
                prompt: 'Please provide me a city to search up!',
                type: 'string'
            }]
        });
    }

    async run(message, args) {
        const { city } = args;

        const msg = await message.channel.send('🔄 | Fetching weather information...\u2026');

        const res = await snekfetch
            .get(`https://query.yahooapis.com/v1/public/yql`)
            .query({
                q: `select * from weather.forecast where u='f' AND woeid in (select woeid from geo.places(1) where text="${city}")`, // eslint-disable-line max-len
                format: 'json'
            });
            
        if (typeof res.body !== 'object' || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {
            return msg.edit(`❎ | Failed to retrieve weather information for **${city}**! Please verify that it is a valid location!`)
        }

        const weather = res.body.query.results.channel;

        const _location = []
        for (const k of['city', 'region', 'country']) {
            if (weather.location[k]) _location.push(weather.location[k].trim())
        }
        const location = _location.join(', ')

        const flag = weather.title.slice(-2).split('').map(i => {
            const e = EMOJIMAP[i.toLowerCase()];
            return typeof e === 'object' ? e[0] : e;
        }).join('');

        const formatIcon = text => {
            let icon = ''
            for (const wi of WEATHER_THUMBS) {
                if (wi.regex.test(text)) {
                    icon = wi.icon;
                    break
                }
            }
            return icon;
        }

        const formatCondition = text => {
            let icon = ''
            for (const wi of WEATHER_ICONS) {
                if (wi.regex.test(text)) {
                    icon = `\u2000${wi.icon}`
                    break
                }
            }
            return `**${text}**${icon}`
        }

        const formatTemp = value => {
            if (weather.units.temperature === 'F') {
                return `${((parseFloat(value) - 32) * 5 / 9).toFixed(0)} °C | ${value} °F`
            } else if (weather.units.temperature === 'C') {
                return `${value} °C | ${(parseFloat(value) * 9 / 5 + 32).toFixed(0)} °F`
            } else {
                return `${parseInt(value)} °${weather.units.temperature}`
            }
        }

        const formatSpeed = value => {
            if (weather.units.speed === 'mph') {
                return `${(parseFloat(value) * 0.44704).toFixed(1)} mps | ${value} mph`
            } else if (weather.units.speed === 'mps') {
                return `${value} mps | ${(parseFloat(value) * 2.2369).toFixed(1)} mph`
            } else {
                return `${parseInt(value)} ${weather.units.speed}`
            }
        }

        const formatClock = clock => {
            const matches = clock.match(/(\d{1,2}):(\d{1,2}) (am|pm)/i)
            const _ = i => i.length === 1 ? `0${i}` : i
            return `${_(matches[1])}:${_(matches[2])} ${matches[3].toUpperCase()}`
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#DFA661')
            .setThumbnail(formatIcon(weather.item.condition.text))
            .setFooter(`Last Update: ${weather.item.pubDate}`, this.client.user.displayAvatarURL())
            .setDescription(stripIndents `
                ${flag}\u2000|\u2000**${location}**
            
                •\u2000${formatCondition(weather.item.condition.text)}
            
                •\u2000\**Temperature:** ${formatTemp(weather.item.condition.temp)}
                •\u2000\**Wind:** ${weather.wind.direction}° / ${formatSpeed(weather.wind.speed)}
                •\u2000\**Humidity:** ${weather.atmosphere.humidity}%
                •\u2000\**Pressure:** ${weather.atmosphere.pressure} hPa
                •\u2000\**Visibility:** ${weather.atmosphere.visibility}%
                •\u2000\**Sunrise:** ${formatClock(weather.astronomy.sunrise)} / **Sunset:** ${formatClock(weather.astronomy.sunset)}`)
            .addField('❯\u2000\**Forecasts**', weather.item.forecast.map(f => {
                return `•\u2000\**${DAYS[f.day]}:** ${f.text} • \`${formatTemp(f.low)} - ${formatTemp(f.high)}\``
            }));
        return msg.edit(`Weather information for the location that matched the word **${city}**!`, { embed: embed });
    }
}