const getos = require('getos')

exports.run = async (bot, msg) => {
  if (msg.guild) {
    bot.utils.assertEmbedPermission(msg.channel, msg.member)
  }

  getos(async (err, res) => {
    try {
      if (err) {
        throw (err)
      }
      return msg.edit(`🖥️\u2000OS: ${res.os === 'linux' ? `${res.dist} ${res.release}` : res.os}`)
    } catch (err) {
      msg.error(err)
    }
  })
}

exports.info = {
  name: 'getos',
  usage: 'getos',
  description: 'Gets the name of the OS the bot is running on'
}
