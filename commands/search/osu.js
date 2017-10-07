const osu = require('node-osu');

var osuApi = new osu.Api('f316a5a29f4b0da2712b4fb68422f083f3fdb931', {
    notFoundAsError: true, 
    completeScores: false
})

exports.run = async function (client, message, Discord, args) {
    const query = args 
    try {
        osuApi.getUser({u: query}).then(user => {
            const embed = new Discord.RichEmbed()
                .setColor('0xFF66AA')
                .setAuthor(user.name, 'https://a.safe.moe/Z7DGu.png')
                .setFooter(user.country + ` | ID: ` + user.id)
                .addField("❯ Level", user.level, true)
                .addField('❯ Play Count', user.counts.plays, true)
                .addField('❯ Accuracy Percentage', user.accuracyFormatted, true)
                .addField("❯ Rank", user.pp.rank, true)
                .addField('❯ Country Rank', user.pp.countryRank, true)
                .addBlankField()
                .addField('❯ SS', user.counts.SS, true)
                .addField('❯ S', user.counts.S, true)
                .addField('❯ A', user.counts.A, true)
            return message.channel.send({embed})
        });

    } catch(err) {
        message.channel.send(`Something went wrong while executing that function.`).then(m => m.delete(5000));
        return message.react('✖')
    }
}