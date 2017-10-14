exports.run = async (bot, msg) => {
  if (msg.guild) {
    bot.utils.assertEmbedPermission(msg.channel, msg.member)
  }

  return msg.edit('My guilds:', { embed:
    bot.utils.formatLargeEmbed('', `**Total:** ${bot.guilds.size}`,
      {
        delimeter: '\n',
        children: bot.guilds.sort((a, b) => b.memberCount - a.memberCount).map(g => {
          return `•\u2000**${g.name}** – ${g.memberCount} member${g.memberCount !== 1 ? 's' : ''}, ` +
            `${g.channels.size} channel${g.channels.size ? 's' : ''}`
        })
      },
      { inline: false }
    )
  })
}

exports.info = {
  name: 'guilds',
  usage: 'guilds',
  description: 'Lists all guilds that you\'re a member of',
  aliases: ['servers']
}
