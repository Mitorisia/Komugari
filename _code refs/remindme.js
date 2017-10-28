const Sherlock = require('sherlockjs');
const moment = require('moment');

exports.run = async (client, msg) => {
  let embed = new client.methods.Embed()
  const s = Sherlock.parse(msg.content);
  const relative = s.startDate.getTime() - Date.now();
  s.eventTitle = s.eventTitle.replace(/^me to ?|^me ?|^to ?/, '');
  msg.channel.send(`I will remind you to ${s.eventTitle} ${moment().add(relative, 'ms').fromNow()}.`);
  setTimeout(() => {
    let final = `${s.eventTitle}`;
    embed.setAuthor("REMINDER")
    .setDescription(final)
    .setTimestamp()
    msg.author.send({embed})
  }, relative);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "remindme",
  description: "Set something to remind.",
  usage: "", // I don't know what should be in here
  usageDelim: "",
};
