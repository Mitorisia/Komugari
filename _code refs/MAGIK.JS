const snekfetch = require('snekfetch')

exports.run = async(bot, msg, args) => {
    const parsed = bot.utils.parseArgs(args, 'u')

    if (!parsed.leftover.length) {
        return msg.error('Tag a user or specify an image URL!')
    }

    let keyword = parsed.leftover.join(' ')
    let content = msg.content
    let imageURL

    try {
        const get = bot.utils.getUser(msg.guild, keyword, msg.author)
        const user = get[0]

        imageURL = user.displayAvatarURL
        if (!imageURL) {
            return msg.error('Could not get display avatar of the specified user!')
        }
    } catch (err) {
        if (/^<\.*?>$/.test(keyword)) {
            keyword = keyword.substring(1, keyword.length - 1)
        }

        if (/^https?:\/\//i.test(keyword)) {
            imageURL = keyword
        } else {
            return msg.error(err)
        }
    }

    await msg.edit(`${PROGRESS}${content}`)
    const res = await snekfetch.get(`https://discord.services/api/magik?url=${imageURL}`)

    if (res.status === 200) {
        await msg.edit(`${SUCCESS}${content}`)
        return msg.channel.send({
            file: {
                name: 'magik.png',
                attachment: res.body
            }
        })
    } else {
        await msg.edit(`${FAILURE}${content}`)
        return msg.error(res.text)
    }
}

exports.info = {
    name: 'magik',
    usage: 'magik <user|url>',
    description: 'Makes something magik!',
    examples: [
        'magik @user',
        'magik https://nekos.life/static/neko/neko1.jpg'
    ]
}