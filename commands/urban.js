const urban = require('relevant-urban')

exports.run = async (client, message, Discord, args) => {

  const query = message.content.split(/\s+/g).slice(1).join(" ");

  const defs = await (query.length ? urban(query) : urban.random())
  let def, total

  if (!defs) {
    message.channel.send('No matches found!').then(m => m.delete(5000));
  }

  if (defs.constructor.name === 'Array') {
    // NOTE: Results from urban.all(query)
    // TODO: Pull all pages then sort based on thumbs up / thumbs down ratio to find top definition
    total = Object.keys(defs).length

    if (!defs || !total) {
      message.channel.send('No matches found!').then(m => m.delete(5000));
    }

    def = defs[1]
  } else if (defs.constructor.name === 'Definition') {
    // NOTE: Results from urban.random()
    def = defs
  }

  const resultMessage = query.length > 0
    ? `First result for \`${query}\` on Urban Dictionary:`
    : `Random definition on Urban Dictionary:`

    const embed = new Discord.RichEmbed()
    .setTitle(`${defs.word} by ${defs.author}`)
    .setDescription(defs.definition)
    .addField('Example(s)', defs.example ? defs.example : 'N/A')
    .addField('Rating', `👍\u2000${defs.thumbsUp} | 👎\u2000${defs.thumbsDown}`)
    .addField('Link', `**${defs.urbanURL}**`)
    .setColor('#e86222')
    .setFooter('Urban Dictionary', 'https://a.safe.moe/1fscn.png')
  return message.channel.send(resultMessage, {embed})
}