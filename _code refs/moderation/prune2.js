exports.run = function(bot, msg, args) {
    let messagecount = parseInt(args.join(' '));
    if(messagecount > 100) return msg.reply("Amount needs to be lower then 100!");
    if(!messagecount) return msg.reply(":no_entry: `ERROR` Invalid amount, please specify a number of messages to purge!");
    msg.channel.fetchMessages({limit: messagecount});
    msg.channel.bulkDelete(messagecount, true);
    msg.reply(`I have deleted **${messagecount}** messages!`).then(msg => msg.delete(2000));
  };
  