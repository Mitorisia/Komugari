const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const moment = require('moment');
const clocks = ["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"]

module.exports = class TimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'time',
            aliases: ['clock'],
            group: 'utility',
            memberName: 'time',
            guildOnly: true,
            description: 'Shows the time for the given location!',
            examples: ['~time [city/country]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run(message) {
        const location = message.content.split(/\s+/g).slice(1).join(" ");
        if (!location) return message.channel.send('Please specify a location for me to gather information from!');

        try {
            const res = await snekfetch.get(`https://time.is/${location}`);
            if (res.status !== 200) {
                return message.channel.send('❎ | Could not connect to the server!')
            }

            const text = res.text || res.body.toString();

            const date = text.match(new RegExp('<div id="dd" class="w90 tr" onclick="location=\'/calendar\'" ' + 'title="Click for calendar">([^]+?)</div>'))[1]
            const time = text.match(/<div id="twd">([^]+?)<\/div>/)[1].replace(/<span id="ampm" style="font-size:21px;line-height:21px">(AM|PM)<\/span>/, ' $1')
            const place = text.match(/<div id="msgdiv"><h1>Time in ([^]+?) now<\/h1>/)[1]
            const clock = clocks[parseInt(time.split(':')[0], 10) % 12]

            var parsedTime = moment(`${date} ${time}`, 'dddd, MMMM D, YYYY HH:mm:ss A')
            return message.channel.send(`${clock} | The time in **${place}** is \`${parsedTime.format('dddd, MMMM Do YYYY @ h:mm:ss a')}\`!`)

        } catch (err) {
            console.log(err)
            return message.channel.send(`❎ | Location **${location}** was not found!`);
        }
    }
}