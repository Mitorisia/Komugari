const moment = require('moment')

exports.run = async (bot, msg, args) => {
  if (msg.guild) {
    bot.utils.assertEmbedPermission(msg.channel, msg.member)
  }

  const parsed = bot.utils.parseArgs(args, ['m'])
  const keyword = parsed.leftover.join(' ')

  const get = bot.utils.getUser(msg.guild, keyword, msg.author)
  const user = get[0]
  const member = msg.guild ? msg.guild.member(user) : null
  const mention = get[1]

  if (parsed.options.m && user === bot.user) {
    throw new Error(`Use \`${config.prefix}guilds\` command to if you want to list your own guilds!`)
  }

  await msg.edit(`${PROGRESS}Fetching profile\u2026`)
  let profile = {}
  try {
    profile = await user.fetchProfile()
  } catch (err) {}

  const avatarURL = user.displayAvatarURL({ size: 2048 })
  if (parsed.options.m) {
    if (!profile.mutualGuilds.size) {
      throw new Error(`You and ${user.tag} have no mutual guilds!`)
    }

    const thumbAvatarURL = avatarURL.replace(/\?size=\d+?$/i, '')
    const message = mention
      ? `List of mutual guilds with ${keyword}:`
      : `List of mutual guilds with the user who matched the keyword \`${keyword}\`:`
    return msg.edit(message, { embed:
      bot.utils.formatLargeEmbed('', `**Total:** ${profile.mutualGuilds.size}`,
        {
          delimeter: '\n',
          children: profile.mutualGuilds.sort((a, b) => b.memberCount - a.memberCount).map(g => {
            return `•\u2000**${g.name}** – ${g.memberCount} member${g.memberCount !== 1 ? 's' : ''}, ` +
              `${g.channels.size} channel${g.channels.size ? 's' : ''}`
          })
        },
        {
          inline: false,
          color: member ? member.displayColor : 0,
          author: {
            name: `Mutual guilds with ${user.tag}`,
            icon: thumbAvatarURL
          }
        }
      )
    })
  } else {
    const description = user.presence.game
      ? (user.presence.game.type ? 'Streaming' : 'Playing') + ` **${user.presence.game.name}**`
      : `*${user === bot.user ? 'I am' : 'This user is'} not playing/streaming anything\u2026*`

    const nestedFields = [
      {
        title: 'User Information',
        fields: [
          {
            name: 'ID',
            value: user.id
          },
          {
            name: 'Status',
            value: user !== bot.user ? user.presence.status : bot.user.settings.status
          },
          {
            name: 'Created',
            value: `${moment(user.createdAt).format(bot.consts.mediumDateFormat)} ` +
              `(${bot.utils.fromNow(user.createdAt)})`
          }
        ]
      }
    ]

    if (user.bot) {
      nestedFields[0].fields.push({
        name: 'Bot',
        value: bot.utils.formatYesNo(user.bot)
      })
    } else {
      nestedFields[0].fields.push({
        name: profile.premiumSince ? 'Nitro since' : 'Nitro',
        value: `${profile.premiumSince ? `${moment(profile.premiumSince).format(bot.consts.mediumDateFormat)} ` +
          `(${bot.utils.fromNow(profile.premiumSince)})` : 'no'}`
      })

      if (user !== bot.user) {
        nestedFields[0].fields.push({
          name: 'Mutual guilds',
          value: profile.mutualGuilds ? profile.mutualGuilds.size : '0'
        })
      }
    }

    nestedFields[0].fields.push({
      name: 'Avatar',
      value: avatarURL
        ? `[${bot.utils.getHostName(avatarURL) || 'Click here'}](${avatarURL})`
        : 'N/A'
    })

    if (member) {
      nestedFields.push({
        title: 'Guild Membership',
        fields: [
          {
            name: 'Nickname',
            value: member.nickname || 'N/A'
          },
          {
            name: 'Joined',
            value: `${moment(member.joinedAt).format(bot.consts.mediumDateFormat)} ` +
              `(${bot.utils.fromNow(member.joinedAt)})`
          }
        ]
      })

      // NOTE: Slice off the first item (the @everyone)
      const roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => {
        return role.name
      })

      nestedFields.push({
        title: `Guild Roles [${roles.length}]`,
        fields: [
          {
            value: roles.length ? roles.join(', ') : 'N/A'
          }
        ]
      })
    } else {
      nestedFields.push({
        title: 'Guild Membership',
        fields: [
          {
            value: '*This user is not a member of the currently viewed guild\u2026*'
          }
        ]
      })
    }

    const thumbAvatarURL = avatarURL.replace(/\?size=\d+?$/i, '')
    const message = !keyword.length
      ? 'My information:'
      : (mention ? `Information of ${keyword}:` : `Information of the user who matched the keyword \`${keyword}\`:`)
    return msg.edit(message, { embed:
      bot.utils.formatEmbed('', description, nestedFields, {
        thumbnail: thumbAvatarURL,
        color: member ? member.displayColor : 0,
        author: {
          name: user.tag,
          icon: thumbAvatarURL
        }
      })
    })
  }
}

exports.info = {
  name: 'userinfo',
  usage: 'userinfo <user>',
  description: 'Shows yours or another user\'s info',
  aliases: ['info'],
  options: [
    {
      name: '-m',
      usage: '-m',
      description: 'Lists your mutual guilds with the user'
    }
  ]
}
