const Discord = module.require('discord.js');

module.exports.run = async(client, message, args) =>{

  if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.channel.send('You dont have permissions ya twat!');

    let userMute = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!userMute){
      let embed = new Discord.RichEmbed()
        .setTitle('Please specify any mentions.')
        .setColor("#f22a0c")
        .setFooter('Mute', client.user.avatarURL)
        .setTimestamp(new Date());

      message.channel.send({embed});
      return
    }

  message.channel.overwritePermissions(userMute, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        })
    if(message.guild.channels.find('name', 'mod-log')){
      let embed = new Discord.RichEmbed()
        .setTitle(`${userMute.username} has been muted here! 🙊`)
        .setColor("#f22a0c")
        .setFooter('Mute', client.user.avatarURL)
        .setTimestamp(new Date());
      let embedmodlog = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTitle(`${userMute.username} has been muted in ${message.channel.name}! 🙊`)
        .setColor("#f22a0c")
        .setFooter('Mute', client.user.avatarURL)
        .setTimestamp(new Date());
      message.channel.send({embed});
      message.guild.channels.find('name', 'mod-log').send({embed: embedmodlog})
    }else {
      let embed = new Discord.RichEmbed()
        .setTitle(`${userMute.username} has been muted here! 🙊`)
        .setColor("#f22a0c")
        .setFooter('Mute', client.user.avatarURL)
        .setTimestamp(new Date());
      message.channel.send({embed});
    }
}

exports.help = {
  name: 'mute',
  description: '🙊 Mutes a mentioned user in the given channel.',
  usage: 'mute [mention or ID]'
};
