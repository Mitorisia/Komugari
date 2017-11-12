const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class BulkBanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bulkban',
            guildOnly: true,
            aliases: ['batchban', 'massban'],
            group: 'moderation',
            memberName: 'bulkban',
            description: 'Bans a list of user IDs',
            examples: ['~massban [mentions/user IDs separated by spaces of commas]'],
            throttling: {
                usages: 1,
                duration: 30
            },
            args: [{
                key: 'users',
                prompt: 'Please provide me some users to ban! `(Mention the users or give a list of IDs separated by spaces or commas)`',
                type: 'string'
            }]
        });
    }

    async run(message, args) {
        const users = args.users;

        let regex = /\b[0-9]{17,18}\b/g;
        let found = users.match(regex)

        if (!found.length) return message.channel.send('No IDs found! Please ensure that there are IDs separated by spaces or commas!');

        let sent = await message.channel.send(`🔄 | Attempting to ban ${found.length} users... keep your eye on this message!`);

        ban_user(0, found, this.client.users, sent, message);

        return null;
    }
}

async function ban_user(index, found, users, sent, message) {

    var user = await users.fetch(found[index])
        .catch(err => sent.edit(sent.content += `\n**Error** ${err.name}: \`${err.message} ${found[index]}\``))

    if (user.tag) {
        try {
            message.guild.ban(found[index], { days: 7, reason: `responsible: ${message.author.tag}` }).catch(err => sent.edit(sent.content += `\nError trying to ban **${user.tag}** \`(${user.id})\`!`))
            sent.edit(sent.content += `\nBanned **${user.tag}** \`(${user.id})\``)
        } catch (err) {
            sent.edit(sent.content += `\nError trying to ban **${user.tag}** \`(${user.id})\`!`)
        }
    }

    if (index < found.length - 1) ban_user(index + 1, found, users, sent, message);
    else sent.edit(sent.content += `\n__Finished bulk ban!__`)
}