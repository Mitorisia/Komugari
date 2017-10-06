exports.run = (client, message) => {
      return message.channel.send(`${client.consts.rightThere[Math.round(Math.random() * (client.consts.rightThere.length - 1))]}`)
}