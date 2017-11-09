const { Command } = require('../../commando');
const { stripIndents } = require('common-tags');
const winston = require('winston');

module.exports = class NukeCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'nuke',
                aliases: ['cybernuke'],
                group: 'moderation',
                memberName: 'nuke',
                description: 'Bans all members that have joined recently, with new accounts!',
                details: 'Useful for servers under constant raiding!',
                guildOnly: true,

                args: [{
                        key: 'join',
                        label: 'member age',
                        prompt: 'how old (in minutes) should a member be for the nuke to ignore them (server join date)?',
                        type: 'float',
                        min: 0.1,
                        max: 120
                    },
                    {
                        key: 'age',
                        label: 'account age',
                        prompt: 'how old (in minutes) should a member\'s account be for the nuke to ignore them (account age)?',
                        type: 'float',
                        min: 0.1
                    }
                ]
            });
        }

        hasPermission(message) {
            return this.client.isOwner(message.author) || message.member.hasPermission('ADMINISTRATOR');
        }

        async run(message, { age, join }) {
                const statusMsg = await message.channel.send('Calculating targeting parameters for cybernuke...');
                await message.guild.members.fetch();

                const memberCutoff = Date.now() - (join * 60000);
                const ageCutoff = Date.now() - (age * 60000);
                const members = message.guild.members.filter(
                    mem => mem.joinedTimestamp > memberCutoff && mem.user.createdTimestamp > ageCutoff
                );
                const booleanType = this.client.registry.types.get('boolean');

                await statusMsg.edit(`Cybernuke will strike ${members.size} members; proceed?`);
                let response;
                let statusMsg2;

                while (!statusMsg2) {
                    const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
                        max: 1,
                        time: 15000
                    });

                    if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
                    if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')

                    statusMsg2 = await message.channel.send('🚀 | Launching cybernuke...!');
                }
                /* eslint-enable no-await-in-loop */

                const fatalities = [];
                const survivors = [];
                const promises = [];

                for (const member of members.values()) {
                    promises.push(
                        member.send(stripIndents `
					Sorry, but you've been automatically targetted by the cybernuke in the **${message.guild.name}** server!
					This means that you have been banned, likely in the case of a server raid!
					Please contact them if you believe this ban to be in error! \`(${message.author.tag})\`
				`).catch('ok')
                        .then(() => member.ban())
                        .then(() => {
                            fatalities.push(member);
                        })
                        .catch(err => {
                            console.log(err);
                            survivors.push({
                                member: member.id,
                                error: err
                            });
                        })
                        .then(() => {
                            if (members.size <= 5) return;
                            if (promises.length % 5 === 0) {
                                statusMsg2.edit(`🚀 | Launching cybernuke (${Math.round(promises.length / members.size * 100)}%)...`);
                            }
                        })
                    );
                }

                await Promise.all(promises);
                await statusMsg2.edit('Cybernuke impact confirmed. Casualty report incoming...');
                await message.channel.send(stripIndents `
			__**Fatalities**__
			${fatalities.length > 0 ? stripIndents`
				${fatalities.length} confirmed KIA.

				${fatalities.map(fat => `**-** ${fat.displayName} \`(${fat.id})\``).join('\n')}
			` : 'None'}


			${survivors.length > 0 ? stripIndents`
				__**Survivors**__
				${survivors.length} left standing.

				${survivors.map(srv => `**-** ${srv.member.displayName} (${srv.member.id}): \`${srv.error}\``).join('\n')}
			` : ''}
		`, { split: true });

		return null;
	}
};