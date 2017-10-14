const moment = require('moment')

const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
const explicitContentFilters = ['No scan', 'Scan from members without a role', 'Scan from all members']

const ROLES = /^r(oles)?$/i
const MEMBERS = /^m(ember(s)?)?$|^u(ser(s)?)?$/i
const CHANNELS = /^c(hannel(s)?)?$/i

exports.run = async (bot, msg, args) => {
  const parsed = bot.utils.parseArgs(args, ['r', 'f:', 'g'])

  if (msg.guild && !(parsed.leftover.length && parsed.options.g)) {
    bot.utils.assertEmbedPermission(msg.channel, msg.member)
  }

  if (!msg.guild && !parsed.options.f) {
    throw new Error('This command can only be used in a guild!')
  }

  const guild = parsed.options.f ? bot.utils.getGuild(parsed.options.f) : msg.guild

  await msg.edit(`${PROGRESS}Fetching guild information\u2026`)

  const res = await bot.utils.fetchGuildMembers(guild, !parsed.options.r)
  const textChannels = guild.channels.filter(c => c.type === 'text')
  const voiceChannels = guild.channels.filter(c => c.type === 'voice')
  const iconURL = guild.iconURL({ size: 2048 })
  const splashURL = guild.splashURL({ size: 2048 })

  let gists, embed
  if (parsed.leftover.length) {
    let title, delimeter, children

    if (ROLES.test(parsed.leftover[0])) {
      title = `Roles in ${guild.name} [${guild.roles.size}]`
      children = guild.roles.sort((a, b) => b.position - a.position).map(r => r.name)
      delimeter = ', '
    } else if (MEMBERS.test(parsed.leftover[0])) {
      title = `Members in ${guild.name} [${guild.memberCount}]`
      children = guild.members.map(m => `${bot.utils.escapeMarkdown(m.user.tag)}${(m.user.bot ? ' **`[BOT]`**' : '')}`)
        .sort()
      delimeter = ', '
    } else if (CHANNELS.test(parsed.leftover[0])) {
      title = `Channels in ${guild.name} [${guild.channels.size}]`

      const sortPos = (a, b) => a.position - b.position
      children = [].concat(
        textChannels.sort(sortPos).map(c => {
          const isHidden = !c.permissionsFor(guild.me).has(['READ_MESSAGES', 'READ_MESSAGE_HISTORY'])
          const isDefault = c === guild.defaultChannel
          return `•\u2000# ${c.name}${isDefault ? ' **`[DEFAULT]`**' : ''}${isHidden ? ' **`[HIDDEN]`**' : ''}`
        }),
        voiceChannels.sort(sortPos).map(c => {
          const isLocked = !c.permissionsFor(guild.me).has('CONNECT')
          const isAFK = c.id === guild.afkChannelID
          return `•\u2000${c.name}${isAFK ? ' **`[AFK]`**' : ''}${isLocked ? ' **`[LOCKED]`**' : ''}`
        })
      )

      delimeter = '\n'
    } else {
      throw new Error('That action is not valid!')
    }

    if (parsed.options.g) {
      gists = children.join('\n')
    } else {
      embed = bot.utils.formatLargeEmbed('', '', { delimeter, children }, {
        author: {
          name: title,
          icon: iconURL
        }
      })
    }
  } else {
    const online = guild.members.filter(m => {
      return (m.user === bot.user ? bot.user.settings.status : m.user.presence.status) !== 'offline'
    })
    const nestedFields = [
      {
        title: 'Guild Information',
        fields: [
          {
            name: 'ID',
            value: guild.id
          },
          {
            name: guild.owner ? 'Owner' : 'Owner ID',
            value: guild.owner ? `${guild.owner.user.tag} (ID: ${guild.owner.id})` : guild.ownerID
          },
          {
            name: 'Default',
            value: `#${guild.defaultChannel.name} (ID: ${guild.defaultChannel.id})`
          },
          {
            name: 'Created',
            value: `${moment(guild.createdAt).format(bot.consts.mediumDateFormat)} ` +
              `(${bot.utils.fromNow(guild.createdAt)})`
          },
          {
            name: 'Region',
            value: guild.region
          },
          {
            name: 'Verification',
            value: verificationLevels[guild.verificationLevel]
          },
          {
            name: 'Filter',
            value: explicitContentFilters[guild.explicitContentFilter]
          }
        ]
      },
      {
        title: 'Statistics',
        fields: [
          {
            name: 'Channels',
            value: `${guild.channels.size} – ${textChannels.size} text & ${voiceChannels.size} voice`
          },
          {
            name: 'Members',
            value: `${guild.memberCount} – ${online.size} online`
          },
          {
            name: 'Roles',
            value: guild.roles.size
          }
        ]
      }
    ]

    if (splashURL) {
      nestedFields[0].fields.push({
        name: 'Splash image',
        value: `[${bot.utils.getHostName(splashURL) || 'Click here'}](${splashURL})`
      })
    }

    const myRoles = guild.me.roles.size - 1
    embed = bot.utils.formatEmbed('', `_I have **${myRoles} role${myRoles !== 1 ? 's' : ''}** in this guild\u2026_`,
      nestedFields, {
        thumbnail: iconURL,
        author: { name: guild.name, icon: iconURL }
      }
    )
  }

  if (res.time && embed) {
    embed.setFooter(`Time taken to re-fetch members: ${res.time}`)
  }

  if (parsed.options.g && gists) {
    await msg.edit('🔄\u2000Uploading to GitHub Gists\u2026')
    const r = await bot.utils.gists(gists)
    return msg.success(`<${r}>`, { timeout: -1 })
  } else {
    const color = await bot.utils.getGuildColor(guild)
    const message = parsed.options.f
      ? `Information of the guild which matched the keyword \`${parsed.options.f}\`:`
      : 'Information of the currently viewed guild:'
    return msg.edit(message, { embed: embed.setColor(color) })
  }
}

exports.info = {
  name: 'guildinfo',
  usage: 'guildinfo [options] [roles|members|channels]',
  description: 'Shows info of the server you are in',
  aliases: ['guild', 'server', 'serverinfo'],
  options: [
    {
      name: '-r',
      usage: '-r',
      description: 'Re-fetches all guild members (recommended with large guild)'
    },
    {
      name: '-f',
      usage: '-f <guild name>',
      description: 'Uses a certain guild instead'
    },
    {
      name: '-g',
      usage: '-g',
      description: 'Uploads to GitHub Gists (to be used with `roles`, `members` or `channels`)'
    }
  ],
  examples: [
    'guildinfo',
    'guildinfo roles',
    'guildinfo -f "discord.js official"'
  ]
}
