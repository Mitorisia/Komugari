const snekfetch = require('snekfetch')

exports.run = async (client, message, Discord, args) => {
  let question = message.content.split(/\s+/g).slice(1).join(" ");

  if (!question) {
    message.channel.send('You must provide a question!')
  }

  const res = await snekfetch.get(`https://8ball.delegator.com/magic/JSON/${question}`)

  if (!res || !res.body || !res.body.magic) {
    message.channel.send('Could not retrieve answer from 8-ball!')
  }

  try {
  const magic = res.body.magic
    const embed = new Discord.RichEmbed()
        .setAuthor(question, 'https://a.safe.moe/aKDHV.png')
        .setDescription(magic.answer + '.')
        .setColor('#646770')
  return message.channel.send({embed})
  } catch(err) {
    message.react('✖')
  }
}