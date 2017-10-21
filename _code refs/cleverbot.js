var reload = require('require-reload')(require),
logger = new(reload('../utils/Logger.js'))((reload('../config.json')).logTimestamp, 'yellow'),
config = reload('../config.json'),
antiSpam = {};
const axios = require("axios");

function spamCheck(userId, text) {
if (!antiSpam.hasOwnProperty(userId)) { //If user not there add them
  antiSpam[userId] = text;
  return true;
}
if (antiSpam[userId] == text) //If user sent the same message ignore it
  return false;
antiSpam[userId] = text;
return true;
}

function trimText(cleanContent, name) {
return cleanContent.replace(`@${name}`, '').trim(); //Removes the @Bot part
}

module.exports = (bot, msg, config, settingsManager) => {
const owner = bot.users.get(config.adminIds[0]);
if (msg.channel.guild !== undefined && !msg.channel.permissionsOf(msg.author.id).has('manageChannels') && settingsManager.isCommandIgnored('', 'cleverbot', msg.channel.guild.id, msg.channel.id, msg.author.id) === true)
  return;
let text = msg.channel.guild === undefined ? msg.cleanContent : trimText(msg.cleanContent, msg.channel.guild.members.get(bot.user.id).nick || bot.user.username);
if (spamCheck(msg.author.id, text)) {
  cleverbotTimesUsed++;
  logger.logCommand(msg.channel.guild === undefined ? null : msg.channel.guild.name, msg.author.username, '@' + bot.user.username, text);
  if (text === '') //If they just did @Botname
    msg.channel.createMessage(`${msg.author.username}, What do you want to talk about?`);
  else {
    msg.channel.sendTyping();
    // http://api.program-o.com/v2/chatbot/?bot_id=6&say=${text}&convo_id=${msg.author.id}&format=json
    axios.get(`http://api.program-o.com/v2/chatbot/?bot_id=12&say=${text}&convo_id=${msg.author.id}&format=json`).then(res => {
      let answer = res.data.botsay;
      if (!answer) return bot.createMessage(msg.channel.id, `${msg.author.username}, I don't wanna talk right now :slight_frown:`)
        .catch(err => {
          handleError(bot, __filename, msg.channel, err);
        });
      // answer = answer.replace("Program-O", bot.user.username);
      answer = answer.replace(/Chatmundo/g, bot.user.username);
      answer = answer.replace(/<br\/> ?/, "\n");
      answer = answer.replace(/Elizabeth/g, `${owner.username}#${owner.discriminator}`);
      bot.createMessage(msg.channel.id, `${msg.author.username}, ${answer}`);
    }).catch(err => {
      console.log(err);
      bot.createMessage(msg.channel.id, `${msg.author.username}, I don't wanna talk right now :slight_frown:`);
    });
  }
}
}


//also


const axios = require("axios"),
logger = require("../utils/logger.js");
module.exports = function(bot) {
bot.registerCommand("c", (msg, args) => {
    axios.get(`http://api.program-o.com/v2/chatbot/?bot_id=6&say=${args}&convo_id=discordbot_1&format=json`)
        .then(function(response) {
            bot.createMessage(msg.channel.id, "**" + msg.author.username + "#" + msg.author.discriminator + ":** " + response.data.botsay.replace("Program-O", bot.user.username));
            var command = "Chat - Status: Success";
            logger.commandUsed(bot, msg, command);
        })
        .catch(function(error) {
            bot.createMessage(msg.channel.id, "Not feeling like talking :slight_frown: ");
            var command = "Chat - Status: Failed";
            logger.commandUsed(bot, msg, command);
        });
});
};