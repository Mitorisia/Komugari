const { stripIndents } = require('common-tags')

const CATEGORY = /^c(ategory)?$|^type$/i
const ALL = /^a(ll)?$|^full$|^every$/i

exports.run = async (bot, msg, args) => {
  if (msg.guild) {
    bot.utils.assertEmbedPermission(msg.channel, msg.member)
  }

  let commands = []
  let title = 'Categories'

  if (args.length > 0) {
    if (CATEGORY.test(args[0])) {
      if (args.length < 2) {
        throw new Error('You must specify a category!')
      }

      commands = bot.commands.all(args[1])
      title = `${args[1]} Commands`
    } else if (ALL.test(args[0])) {
      commands = bot.commands.all()
      title = 'All Commands'
    } else {
      const command = bot.commands.get(args[0])
      if (!command) {
        throw new Error(`The command \`${args[0]}\` does not exist!`)
      }

      commands = [command]
      title = `\`${command.info.name}\``
    }
  }

  if (commands.length > 1) {
    const filtered = commands.filter(c => !c.info.hidden).sort((a, b) => a.info.name.localeCompare(b.info.name))
    let maxLength = 0
    filtered.forEach(c => {
      if (maxLength < c.info.name.length) maxLength = c.info.name.length
    })

    await msg.edit('https://github.com/BobbyWibowo/Lightbringer/blob/master/COMMANDS.md')
    await bot.utils.sleep(200)
    return bot.utils.sendLarge(msg.channel,
      filtered.map(c => {
        return `${bot.utils.pad(' '.repeat(maxLength), c.info.name)} : ${c.info.description || '<no description>'}`
      }).join('\n'),
      {
        prefix: '```\n',
        suffix: '\n```',
        cutOn: '\n'
      }
    )
  } else if (commands.length) {
    const help = getHelp(commands[0])
    await msg.edit(msg.content, { embed:
      bot.utils.embed(help.name, `*This message will self-destruct in 60 seconds.*\n\n${help.value}`)
    })
    return msg.delete({ timeout: 60000 })
  } else {
    const categories = bot.commands.categories().sort()
    await msg.edit(msg.content, { embed:
      bot.utils.embed(title, stripIndents`
        '*This message will self-destruct in 30 seconds.*'

        ❯\u2000**Available categories:**
        ${categories.map(c => `- __${c}__`).join('\n')}

        ❯\u2000**Usage:**
        •\u2000Do \`${config.prefix}help category <name>\` for a list of commands in a specific category.
        •\u2000Do \`${config.prefix}help all\` for a list of every command available in this bot.
        •\u2000Do \`${config.prefix}help <command>\` for help with a specific command.`)
    })
    return msg.delete({ timeout: 30000 })
  }
}

const getHelp = (command) => {
  let description = stripIndents`
    •\u2000**Aliases:** ${command.info.aliases
      ? command.info.aliases.map(a => `\`${config.prefix}${a}\``).join(', ')
      : '<no aliases>'}
    •\u2000**Usage:** \`${config.prefix}${command.info.usage || command.info.name}\`
    •\u2000**Category:** ${command.info.category}
    •\u2000**Description:** ${command.info.description || '<no description>'}`

  if (command.info.credits) {
    description += `\n•\u2000**Credits:** *${command.info.credits}*`
  }

  if (command.info.examples) {
    description += `\n\n•\u2000**Examples:**\n${command.info.examples.map(example => {
      return `-\u2000\`${config.prefix}${example}\``
    }).join('\n')}`
  }

  if (command.info.options instanceof Array) {
    const options = command.info.options.map(option => {
      return stripIndents`
        •\u2000**${option.name}**
        *Usage:* \`${option.usage || option.name}\`
        *Description:* ${option.description}`
    })
    description += `\n\n❯\u2000**Options:**\n${options.join('\n')}`
  }

  return {
    name: command.info.name,
    value: description
  }
}

exports.info = {
  name: 'help',
  usage: 'help all|[command]|[category <name>]',
  description: 'Shows you help for all commands or just a single command',
  aliases: ['h']
}
