const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const moment = require('moment');
const clocks = ["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"]

const timeIs = 'https://time.is/';

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

    async run (message) {
      const location = message.content.split(/\s+/g).slice(1).join(" ");
      if(!location) return message.channel.send('Please specify a location for me to gather information from!');

      try {
        const res = await snekfetch.get(`${timeIs}${location}`)
        const text = res.text || res.body.toString()

        const date = text.match(new RegExp('<div id="dd" class="w90 tr" onclick="location=\'/calendar\'" ' + 'title="Click for calendar">([^]+?)</div>'))[1]
        const time = text.match(/<div id="twd">([^]+?)<\/div>/)[1].replace(/<span id="ampm" style="font-size:21px;line-height:21px">(AM|PM)<\/span>/, ' $1')
        const place = text.match(/<div id="msgdiv"><h1>Time in ([^]+?) now<\/h1>/)[1]
        const clock = clocks[parseInt(time.split(':')[0], 10) % 12]
  
        const parsedTime = moment(`${date} ${time}`, 'dddd, MMMM Do, YYYY HH:mm:ss A') 
        return message.channel.send(`${clock} | The time and date in **${place}** is ${parsedTime}!`)       
        
      } catch (err) {
        console.log(err)
        return message.channel.send(`Location \`${location}\` was not found!`);
      } 
	}
}
