const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class StatusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            guildOnly: true,
            aliases: ['dstatus', 'discord', 'discordstatus'],
            group: 'utility',
            memberName: 'status',
            description: 'Fetches the current Discord status!',
            examples: ['~status'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run (message) {
        try {
            const res = await snekfetch.get('https://srhpyqt94yxb.statuspage.io/api/v2/summary.json');
            let b = JSON.parse(res.text);
            let updatetime = b.page.updated_at;

            try {
                message.channel.send(`**[${b.status.indicator == 'none' ? 'Status' : b.status.indicator}]**: ${b.status.description}!`);
            } catch(err) {
                console.log(err)
                return message.channel.send('No statuses avaliable on the Discord status server!')
            }

        } catch(err) {
            console.log(err)
            return message.channel.send('I couldn\'t connect to the Discord status servers!')
        }


	}
}