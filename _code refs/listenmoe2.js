const reload = require('require-reload'),
config = reload('../../config.json'),
handleError = require('../../utils/utils.js').handleError,
handleErrorNoMsg = require('../../utils/utils.js').handleErrorNoMsg,
utils = require('../../utils/utils.js');
let connections = [];

module.exports = {
desc: "Stream listen.moe to a voice channel.",
usage: "<join/leave/nowplaying>",
aliases: ['listen', 'listenmoe'],
cooldown: 5,
guildOnly: true,
task(bot, msg, args, config, settingsManager) {
  /**
   * perm checks
   * @param {boolean} sendMessages - Checks if the bots permissions has sendMessages
   * @param {boolean} embedLinks - Checks if the bots permissions has embedLinks
   */
  const sendMessages = msg.channel.permissionsOf(bot.user.id).has('sendMessages');
  const embedLinks = msg.channel.permissionsOf(bot.user.id).has('embedLinks');
  if (sendMessages === false) return;
  if (embedLinks === false) return msg.channel.createMessage(`\\❌ I'm missing the \`embedLinks\` permission, which is required for this command to work.`)
    .catch(err => {
      handleError(bot, __filename, msg.channel, err);
    });
  if (!args) return 'wrong usage';
  const command = args.toLowerCase();
  if ((command === 'join') || (command === 'play')) {
    /* JOIN COMMAND */
    let member = msg.member;
    let channelID = member.voiceState ? member.voiceState.channelID : null;
    let channel = msg.channel.guild.channels.get(channelID);
    let guildID = msg.channel.guild ? msg.channel.guild.id : null;
    if (!channelID) {
      return msg.channel.createMessage('Join a voice channel first!');
    } else if (!guildID) {
      return;
    } else {
      let cc = bot.voiceConnections.get(guildID);
      if (cc) {
        cc.switchChannel(channelID);
      } else {
        bot.joinVoiceChannel(channelID)
          .then(vc => {
            connections.push(vc);
            vc.updateVoiceState(false, false);
            let realGuild = bot.guilds.get(guildID);
            console.log(`Added voice connection for guild ${realGuild.name} (${guildID})`);
            msg.channel.createMessage('Joined <#' + channelID + '> and started streaming listen.moe!')
              .then(() => {
                vc.play(config.stream);
              })
              .catch(err => {
                handleError(bot, __filename, msg.channel, err);
              });
          })
          .catch(error => {
            console.log('Error connecting to channel ' + channel.name + ' | ' + error);
          });
      }
    }
  } else if ((command === 'leave') || (command === 'stop')) {
    /* LEAVE COMMAND */
    let member = msg.member;
    let channelID = member.voiceState ? member.voiceState.channelID : null;
    let channel = msg.channel.guild.channels.get(channelID);
    let guildID = msg.channel.guild ? msg.channel.guild.id : null;
    if (!channelID) {
      msg.channel.createMessage('You are not in a voice channel.')
        .catch(err => {
          handleError(bot, __filename, msg.channel, err);
        });
    } else {
      let vc = bot.voiceConnections.find((vc) => vc.id === msg.channel.guild.id);
      if (vc) {
        bot.leaveVoiceChannel(channelID);
        bot.voiceConnections.remove(vc);
        msg.channel.createMessage('Left <#' + channelID + '>')
          .catch(err => {
            handleError(bot, __filename, msg.channel, err);
          });
      }
    }
  } else if ((command === /now ?playing/) || (command === 'np')) {
    utils.startMoeWS()
      .then(res => {
        let listen_moe;
        try {
          listen_moe = JSON.parse(res);
        } catch (error) {
          handleErrorNoMsg(bot, __filename, error);
        }
        let requestedBy = 'n/a';
        if (listen_moe.requested_by) requestedBy = listen_moe.requested_by;
        // Get all the current voice users
        let vcUsers = [];
        bot.voiceConnections.forEach(vc => {
          const members = bot.getChannel(vc.channelID).voiceMembers;
          members.forEach(m => {
            vcUsers.push(m.id);
          });
        });
        // Remove the bot herself from the array
        for (let i = vcUsers.length - 1; i >= 0; i--) {
          if (vcUsers[i] === bot.user.id) {
            vcUsers.splice(i, 1);
          }
        }
        msg.channel.createMessage({
          content: ``,
          embed: {
            color: config.defaultColor,
            description: `Playing **${listen_moe.song_name}** by **${listen_moe.artist_name}**\n` +
              `For **${listen_moe.listeners}** listeners + **${vcUsers.length}** Discord users in **${bot.voiceConnections.size}** channels\n` +
              `Requested by **${requestedBy}**`,
            footer: {
              text: `Info from listen.moe`,
              icon_url: `https://b.catgirlsare.sexy/Z9xM.png`
            }
          }
        }).catch(err => {
          handleError(bot, __filename, msg.channel, err);
        });
      }).catch(err => {
        handleErrorNoMsg(bot, __filename, err);
      });
  } else {
    return 'wrong usage';
  }
}
};