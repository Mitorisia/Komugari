exports.run = async (bot, msg, args) => {
  if (msg.guild) {
    bot.utils.assertEmbedPermission(msg.channel, msg.member)
  }

  const parsed = bot.utils.parseArgs(args, ['r', 'f:', 'g'])

  const guild = parsed.options.f
    ? bot.utils.getGuild(parsed.options.f)
    : (parsed.options.r ? bot.guilds.random() : msg.guild)

  if (!guild) {
    throw new Error('This command can only be used in a guild!')
  }

  const emojis = guild.emojis
  if (!emojis.size) {
    throw new Error('The guild does not have any emojis!')
  }

  if (parsed.options.g) {
    await msg.edit('🔄\u2000Uploading to GitHub Gists\u2026')
    const r = await bot.utils.gists(require('util').inspect(emojis.map(e => {
      return { name: e.name, url: e.url }
    })), { suffix: 'js' })
    return msg.success(`<${r}>`, { timeout: -1 })
  } else {
    const color = await bot.utils.getGuildColor(guild)
    return msg.edit(msg.content, { embed:
      bot.utils.formatLargeEmbed('', '',
        {
          delimeter: ' ',
          children: emojis.map(e => e.toString())
        },
        {
          author: {
            name: `Emojis of ${guild.name} [${emojis.size}]`,
            icon: guild.iconURL
          },
          color
        }
      )
    })
  }
}

exports.info = {
  name: 'emojis',
  usage: 'emojis [options]',
  description: 'Gets the emojis of the current guild',
  options: [
    {
      name: '-r',
      usage: '-r',
      description: 'Uses a random guild instead (not to be used with -l)'
    },
    {
      name: '-f',
      usage: '-f <guild name>',
      description: 'Uses a certain guild instead (not to be used with -r)'
    },
    {
      name: '-g',
      usage: '-g',
      description: 'Dumps emoji names and URLs to GitHub Gists'
    }
  ],
  examples: [
    'emojis',
    'emojis -f "discord.js official"'
  ]
}
