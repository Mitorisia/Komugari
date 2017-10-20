const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const osu = require('node-osu');

var osuApi = new osu.Api('f316a5a29f4b0da2712b4fb68422f083f3fdb931', {
    notFoundAsError: false, 
    completeScores: false
})

module.exports = class OsuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'osu',
            aliases: ['osustats', 'osuuser'],
            group: 'utility',
            memberName: 'osu',
            guildOnly: true,
            description: 'searches for an user on osu!',
            examples: ['~osu [username]'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    run (message) {
        let query = message.content.split(/\s+/g).slice(1).join(" ");

        if(!query) return message.channel.send('Please provide me a user to search for!');
        
        try {
            osuApi.getUser({u: query}).then(user => {

                if(!user.plays) return message.channel.send(`The user **${query}** was not found!`);
                
                const embed = new Discord.MessageEmbed()
                    .setAuthor(user.name, `https://a.ppy.sh/${user.id}`)
                    .addField('❯\u2000\Stats', `•\u2000\**Level:** ${user.level}\n\•\u2000\**Play Count:** ${user.counts.plays}\n\•\u2000\**Accuracy:** ${user.accuracyFormatted}`, true)            
                    .addField('❯\u2000\PP', `•\u2000\**Raw:** ${user.pp.raw} PP\n\•\u2000\**Rank:** ${user.pp.rank}\n\•\u2000\**Country Rank:** ${user.pp.countryRank} ${user.country}`, true)            
                    .addField('❯\u2000\Scores', `•\u2000\**Ranked:** ${user.scores.ranked}\n\•\u2000\**Total:** ${user.scores.total}`, true)            
                    .addField('❯\u2000\Map Ranks', `•\u2000\**SS:** ${user.counts.SS}\n\•\u2000\**S:** ${user.counts.S}\n\•\u2000\**A:** ${user.counts.A}`, true)                    .addBlankField(true)
                    .setThumbnail(`https://a.ppy.sh/${user.id}`)
                    .setColor('#ff66aa')
                    .setImage(`https://lemmmy.pw/osusig/sig.php?colour=bpink&uname=${query}&countryrank&darkheader&darktriangles&avatarrounding=10`);
                return message.channel.send({embed});
            });
    
        } catch(err) {
            return message.channel.send('Something went wrong while executing that function!');
        }
	}
}

/*


                .addBlankField(true)
                .addField('❯ SS', user.counts.SS, true)
                .addField('❯ S', user.counts.S, true)
                .addField('❯ A', user.counts.A, true)*/