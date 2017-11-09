const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class BulkBanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bulkban',
            aliases: ['batchban', 'massacre', 'massban'],
            group: 'moderation',
            memberName: 'bulkban',
            description: 'Bans a list of user IDs!',
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            guildOnly: true,
            args: [
                {
                    key: 'users',
                    prompt: 'Please provide me some users to ban! `(Give a list of IDs separated by spaces or commas)`',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, args) {
        const { users } = args;

        let regex = /\b[0-9]{17,18}\b/g;
        let found = users.match(regex);

        if (!found.length) return message.say('No IDs found! Please ensure that there are IDs separated by spaces or commas!');

        let sent = await message.channel.send(`🔄 | Attempting to ban ${found.length} users... keep your eye on this message!`);

        async function banUser(index) {

            var user = await this.client.fetchUser(found[index])
                .catch(err => sent.edit(sent.content += `\n**Error** ${err.name}: \`${err.message} ${found[index]}\``))

            if (user.tag) {
                message.guild.ban(found[index], { days: 7, reason: `responsible: ${message.author.tag}` })
                    .then(sent.edit(sent.content += `\nBanned ${user.tag} \`(${user.id})\`!`))
            }
            if (index < found.length - 1) banUser(index + 1);
            else sent.edit(sent.content += `\nFinished bulk ban!`)
        }

        banUser(0);

        return null;
    }
};
