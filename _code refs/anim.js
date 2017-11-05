exports.run = async(bot, msg, args) => {

    if (parsed.leftover.length < 1) {
        return msg.error('Please provide some emojis to use!')
    }

    let frames = parsed.leftover
    const content = frames.join(' ')

    if (content.indexOf('|') > -1) {
        frames = content.split('|')
    }

    const delay = 250;

    return bot.utils.playAnimation(msg, delay, frames)
}



exports.playAnimation = async(msg, delay, list) => {
    if (list.length < 1) {
        return
    }

    const next = list.shift()
    const start = this.now()

    try {
        await msg.edit(next)
        const elapsed = this.now() - start
        setTimeout(() => this.playAnimation(msg, delay, list), Math.max(50, delay - elapsed))
    } catch (err) {
        msg.error(err)
    }
}