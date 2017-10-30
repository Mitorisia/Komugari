const { Command } = require('../../commando');
const Discord = require('discord.js');
const urban = require('relevant-urban');

module.exports = class UrbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'urban',
            aliases: ['ud', 'urbandictionary'],
            group: 'utility',
            memberName: 'urban',
            guildOnly: true,
            description: 'Searches for your query on Urban Dictionary!',
            examples: ['~urban [term]'],
            details: 'Say `~urban` for a random definition!',
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(message) {
        const query = message.content.split(/\s+/g).slice(1).join(" ");

        const defs = await (query.length ? urban(query) : urban.random());
        let def, total

        if (!defs) {
            return message.channel.send('No matches found!');
        }

        if (defs.constructor.name === 'Array') {
            total = Object.keys(defs).length

            if (!defs || !total) {
                return message.channel.send('No matches found!');
            }

            def = defs[1]
        } else if (defs.constructor.name === 'Definition') {
            def = defs
        }
        try {
            const resultMessage = query.length > 0 ?
                `First result for \`${query}\` on Urban Dictionary:` :
                `Random definition on Urban Dictionary:`

            const embed = new Discord.MessageEmbed()
                .setTitle(`${defs.word} by ${defs.author}`)
                .setDescription(defs.definition)
                .addField('Example(s)', defs.example ? defs.example : 'N/A')
                .addField('Rating', `👍\u2000${defs.thumbsUp} | 👎\u2000${defs.thumbsDown}`)
                .addField('Link', `**${defs.urbanURL}**`)
                .setColor('#e86222')
                .setFooter('Urban Dictionary', 'https://a.safe.moe/1fscn.png');
            return message.channel.send(resultMessage, { embed });

        } catch (err) {

            return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that command!')
        }
    }
}