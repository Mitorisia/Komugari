exports.run = async (bot, msg) => {
    let member = await msg.mentions.members.first();
    if(!member) return msg.reply("You need to mention someone you plant!");
    let myRole = msg.member.highestRole.position;
    let memberRole = member.highestRole.position;
    let botRole = msg.guild.member(bot.user).highestRole.position;
    if(myRole <= memberRole) return msg.reply("Unable to ban as the mentioned user has a higher/equal role to you!");
    if(myRole <= botRole) return msg.reply("Unable to ban as the mentioned user has a higher/equal role to me!");
    member.ban();
    msg.reply(`I have successfully banned ${member.user.tag}`);
};
