exports.run = async (bot, msg, args) => {
  if (!args.length) {
    throw new Error('You must enter an emoji!')
  }

  const emoji = bot.emojis.find(e => e.toString() === args[0])

  if (!emoji) {
    throw new Error('That emoji was not found!')
  }

  return msg.edit(`${emoji} \`${bot.utils.cleanCustomEmojis(emoji.toString())}\` is from ${emoji.guild.name}.`)
}

exports.info = {
  name: 'locate',
  usage: 'locate <emoji>',
  description: 'Gets the name of the guild that the emoji comes from',
  aliases: ['emoji']
}
