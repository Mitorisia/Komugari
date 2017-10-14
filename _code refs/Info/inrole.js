exports.run = async (bot, msg, args) => {
  if (!msg.guild) {
    throw new Error('This command can only be used in a guild!')
  }

  bot.utils.assertEmbedPermission(msg.channel, msg.member)

  const parsed = bot.utils.parseArgs(args, ['r', 'o'])

  if (parsed.leftover.length < 1) {
    throw new Error('You must specify a role name!')
  }

  const keyword = parsed.leftover.join(' ')
  const get = bot.utils.getGuildRole(msg.guild, keyword)
  const role = get[0]
  const mention = get[1]

  await msg.edit(`${PROGRESS}Fetching role information\u2026`)

  const res = await bot.utils.fetchGuildMembers(msg.guild, !parsed.options.r)
  let members = role.members

  if (parsed.options.o) {
    members = members.filter(m => {
      return (m.user === bot.user ? bot.user.settings.status : m.user.presence.status) !== 'offline'
    })
  }

  const message = mention
    ? `Members of ${keyword}:`
    : `Members of the role which matched the keyword \`${keyword}\`:`
  return msg.edit(message, { embed:
    bot.utils.formatLargeEmbed(`${role.name} (ID: ${role.id})`, `**Guild:** ${msg.guild.name} (ID: ${msg.guild.id})`,
      {
        delimeter: ', ',
        children: members.sort((a, b) => a.user.tag.localeCompare(b.user.tag)).map(m => {
          return `${m.user.tag}${(m.user.bot ? ' **`[BOT]`**' : (m.user === bot.user ? ' **`[YOU]`**' : ''))}`
        })
      },
      {
        color: role.hexColor,
        footer: res.time ? `Time taken to re-fetch members: ${res.time}` : ''
      }
    )
  })
}

exports.info = {
  name: 'inrole',
  usage: 'inrole [-r] <role name>',
  description: 'Shows a list of members which have the specified role',
  options: [
    {
      name: '-r',
      usage: '-r',
      description: 'Re-fetches all guild members (recommended with large guild)'
    },
    {
      name: '-o',
      usage: '-o',
      description: 'Lists online members only'
    }
  ]
}
