const { Command } = require('../../commando');
const Discord = require('discord.js');
const moment = require('moment')
const { fromNow } = require('../../commando/util')

module.exports = class EditsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'edits',
            guildOnly: true,
            aliases: ['edit'],
            group: 'info',
            memberName: 'edits',
            description: 'Fetches the recent edits of a message!',
            examples: ['~edits [message ID]'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [
                {
                    key: 'message',
                    prompt: 'Please provide the ID of the message you want to find edits for!',
                    type: 'message'
                }
            ]
        });
    };

    run (message, args) {
        const m = args.message

        const nestedFields = []

        for (let i = 0; i < m.edits.length; i++) {
            nestedFields.push(`❯\u2000\**${i === m.edits.length - 1 ? 'Original' : (i === 0 ? 'Latest' : `Edit #${m.edits.length - i - 1}`)}:**\n` +
              `•\u2000${m.edits[i].content.length > 0 ? truncate(m.edits[i].content, 1024) : '`N/A`'}\n`
            )
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#B094AF')
            .setAuthor(`${m.author.tag} @ ${moment(m.createdAt).format('MMMM Do YYYY')} (${fromNow(m.editedAt)})`, m.author.displayAvatarURL())
            .setFooter(`Latest edit: ${moment(m.editedAt).format('MMMM Do YYYY')} (${fromNow(m.editedAt)})`)
            .setDescription(nestedFields);
        return message.channel.send({embed})

	}
};

function truncate (string, max, append = '') {
    if (!string || !max || (1 + append.length) >= max) {
        return ''
    }

    if (string.length <= max && !append) {
        return string
    }

    string = string.slice(0, max - 1 - append.length)
    if (/\s/.test(string.charAt(string.length - 1))) {
        string = string.replace(/\s+?$/, '')
    }
    return string + '\u2026' + append
}
