const functions = require("../functions.js");
exports.run = function(bot, msg) {
  let member = msg.mentions.members.first();
  if(!member) return functions.embed(msg, 0xff0000, "Invalid user mention!", "Please mention a user to kick!");
  member.kick();
  functions.embed(msg, 0xff0000, "Successfully kicked user!", `${member.user.tag} (${member.user.id})`);
}
