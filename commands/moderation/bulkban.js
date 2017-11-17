const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class BulkBanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bulkban',
            guildOnly: true,
            aliases: ['batchban', 'massban'],
            group: 'moderation',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['BAN_MEMBERS'],
            memberName: 'bulkban',
            description: 'Bans a list of user IDs!',
            details: 'This command is very destructive and without limitations, please try to use `ban` instead as often as possible!',
            examples: ['~bulkban [mentions/user IDs separated by spaces of commas]'],
            throttling: {
                usages: 1,
                duration: 30
            },
            args: [{
                key: 'users',
                prompt: 'Please provide me some users to ban!',
                type: 'string'
            }]
        });
    }

    async run(message, args) {
        const users = args.users;

        let regex = /\b[0-9]{17,18}\b/g;
        let found = users.match(regex)

        if (!found.length) return message.channel.send('No IDs found! Please ensure that there are IDs separated by spaces or commas!');

        await message.channel.send(`Are you sure you want to ban **${found.length}** users? \`\`(y/n)\`\``);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });
        
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');

        let sent = await message.channel.send(`🔄 | Attempting to ban ${found.length} users... keep your eye on this message!`);

        ban_user(0, found, this.client.users, sent, message);

        return null;
    }
}

async function ban_user(index, found, users, sent, message) {

    var user = await users.fetch(found[index])
        .catch(err => sent.edit(sent.content += `\n**Error** ${err.name}: \`${err.message} ${found[index]}\``));

    if (user.tag) {
        try {
            if (user.id === this.client.user.id) return sent.edit(sent.content += `\nPlease don't ban me!`);
            if (user.id === message.author.id) return sent.edit(sent.content += `\nDon't ban yourself!`);
            if (message.guild.member(user).highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) return sent.edit(sent.content += `\n**${user.tag}**'s roles are too high to be banned!`);
            if (!message.guild.member(user).bannable) return sent.edit(sent.content += `\n**${user.tag}**'s roles are too high to be banned!`);

            message.guild.ban(found[index], { days: 7, reason: `responsible: ${message.author.tag}` }).catch(err => sent.edit(sent.content += `\nError trying to ban **${user.tag}** \`(${user.id})\`!`));
            sent.edit(sent.content += `\nBanned **${user.tag}** \`(${user.id})\``)
        } catch (err) {
            sent.edit(sent.content += `\nError trying to ban **${user.tag}** \`(${user.id})\`!`);
        }
    }

    if (index < found.length - 1) ban_user(index + 1, found, users, sent, message);
    else sent.edit(sent.content += `\n__Finished bulk ban!__`);

    return null;
}