
const wiki = require('wikijs').default

exports.run = async (client, message, Discord, args) => {

  const query = message.content.split(/\s+/g).slice(1).join(" ");

  if (!query) {
    return message.channel.send('You must specify something to search!').then(m => m.delete(5000));
  }

  message.channel.send(`Searching for ${query} on Wikipedia...`).then(m => m.delete(3000));

  const data = await wiki().search(query, 1)
  if (!data.results || !data.results.length) {
    return message.channel.send('No matches found!')
  }

  const page = await wiki().page(data.results[0]) 
  const summary = await page.summary()
  const paragraphs = summary.split('\n')

  if (!query.options) {
    paragraphs.length = Math.min(2, paragraphs.length)
  }

    const embed = new Discord.RichEmbed()
        .setAuthor(page.raw.title)
        .setDescription(paragraphs.join('\n\n'))
        .addField('Link', `**${page.raw.fullurl}**`)
        .setFooter('Wikipedia', 'https://a.safe.moe/8GCNj.png')
        .setColor('#c7c8ca')
    return message.channel.send(`First search result of \`${query}\` on Wikipedia:`, {embed})
}