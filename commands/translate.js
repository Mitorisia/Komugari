const translate = require('google-translate-api')

exports.run = (client, message, Discord, args) => {

  const lang = message.content.split(/\s+/g)[1]
  const input = message.content.split(/\s+/g).slice(2).join(" ");

  if (!lang) {
    return message.channel.send('You must provide a language and some text to translate!').then(m => m.delete(5000));
  }

  translate(input, {to: lang}).then(res => {
    const embed = new Discord.RichEmbed()
          .setAuthor('Translated Text:')
          .setDescription(`**From:** __\`[auto]\`\n\__**To:** __\`${lang}\`__`)
          .setColor('#4c8bf5')
          .setFooter('Google Translate', 'https://a.safe.moe/2jXgX.png')
          .addField('Input', input)
          .addField('Output', res.text)
    message.channel.send({embed});
  })
}