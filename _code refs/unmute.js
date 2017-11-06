const Discord = module.require('discord.js');

exports.run = async(client, message, args) =>{

  if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.channel.send('You dont have permissions ya twat!');

    let userMute = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!userMute){ 
      let embed = new Discord.RichEmbed()
        .setTitle('Please specify any mentions or userID\'s!')
        .setColor("#f22a0c")
        .setFooter('Unmute', client.user.avatarURL)
        .setTimestamp(new Date());

      message.channel.send({embed});
    }

    try{
        message.channel.overwritePermissions(userMute, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        })
    } catch(e) {
        console.log(e.stack)
    }

    let embed = new Discord.RichEmbed()
        .setTitle(`${userMute.username} has been unmuted here! 🐵`)
        .setColor("#31ad18")
        .setFooter('Unmute', client.user.avatarURL)
        .setTimestamp(new Date());

    message.channel.send({embed})
    return
  }

exports.help = {
  name: 'unmute',
  description: '🐵 Unmutes a mentioned user in the given channel.',
  usage: 'warn [mention] [reason]'
};