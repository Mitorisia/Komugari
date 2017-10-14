exports.run = async (bot, msg) => {
  return msg.edit(`⌛\u2000Uptime: ${bot.utils.humanizeDuration(bot.uptime)}.`)
}

exports.info = {
  name: 'uptime',
  usage: 'uptime',
  description: 'Shows the bot\'s uptime',
  aliases: ['up']
}
