const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class OsuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'osu',
            aliases: ['osustats', 'osuuser'],
            group: 'utility',
            memberName: 'osu',
            description: 'searches for an user on osu!',
            examples: ['~osu [username]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
        let user = message.content.split(/\s+/g).slice(1).join(" ");

        if(!user) return message.channel.send('Please provide me a user to search for!');
        
        try {
                const embed = new Discord.MessageEmbed()
                    .setColor('#ff66aa')
                    .setImage(`https://lemmmy.pw/osusig/sig.php?colour=bpink&uname=${user}&countryrank&darkheader&darktriangles&avatarrounding=10`);
                return message.channel.send({embed});
    
        } catch(err) {
            message.channel.send(`Something went wrong while executing that function.`);
            return message.channel.send('Something went wrong while executing that function!');
        }
	}
}