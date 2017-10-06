const snekfetch = require('snekfetch')
const moment = require('moment')

const timeIs = 'https://time.is/'

exports.run = async (client, message, args) => {
  const location = message.content.split(/\s+/g).slice(1).join(" ");
  if(!location) return message.channel.send('Please specify a location for me to gather information from.')
  try {
    const res = await snekfetch.get(`${timeIs}${location}`)
    const text = res.text || res.body.toString()

    const date = text.match(new RegExp('<div id="dd" class="w90 tr" onclick="location=\'/calendar\'" ' +
      'title="Click for calendar">([^]+?)</div>'))[1]
    const time = text.match(/<div id="twd">([^]+?)<\/div>/)[1]
      .replace(/<span id="ampm" style="font-size:21px;line-height:21px">(AM|PM)<\/span>/, ' $1')
    const place = text.match(/<div id="msgdiv"><h1>Time in ([^]+?) now<\/h1>/)[1]
    const clock = client.consts.clocks[parseInt(time.split(':')[0], 10) % 12]

    const tMoment = moment(`${date} ${time}`)
    return message.channel.send(`${clock} The date and time in '${place}' is ${tMoment}.`)
  } catch (err) {
    message.channel.send(`Location \`${location}\` was not found!`).then(m => m.delete(5000));
    console.log(err);
  } 
}