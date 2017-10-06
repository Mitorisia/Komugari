exports.run = async (client, message, Discord, args) => {
    if(message.guild.id !== '198399488614727680') return message.channel.send(`This command can only be used in Big Ben's server.`)
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You cannot use this command!')
    try {
      let channelMessage = message.content.split(/\s+/g).slice(2).join(" ");
      if(!channelMessage) return message.channel.send('Provide something for me to send.').then(m => m.delete(3000));
      let channelid = message.content.split(/\s+/g)[1]
        let channel = client.channels.get(`${channelid}`)
            channel.send(channelMessage);
            await message.react("🇸").catch(console.error);
            await message.react("🇪").catch(console.error);
            await message.react("🇳").catch(console.error);
            return await message.react("🇹").catch(console.error);
    } catch(err) {
      message.channel.send(`There was an error sending your message. Invalid parameters.`).then(m => m.delete(3000));
    }
}