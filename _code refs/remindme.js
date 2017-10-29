const { Command } = require('discord.js-commando');
const moment = require('moment');
const sherlock = require('Sherlock');
const { stripIndents } = require('common-tags');

module.exports = class RemindMeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'remindme',
			aliases: ['remind'],
			group: 'util',
			memberName: 'remindme',
			description: 'Reminds you of something.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'remind',
					label: 'reminder',
					prompt: 'what would you like me to remind you about?\n',
					type: 'string',
					validate: time => {
						const remindTime = sherlock.parse(time);
						if (!remindTime.startDate) return `please provide a valid starting time.`;

						return true;
					},
					parse: time => sherlock.parse(time)
				}
			]
		});
	}

	async run(msg, { remind }) {
		const time = remind.startDate.getTime() - Date.now();
		const preRemind = await msg.say(stripIndents`
			I will remind you '${cleanContent(msg, remind.eventTitle)}' ${moment().add(time, 'ms').fromNow()}.
		`);
		const remindMessage = await new Promise(resolve => {
			setTimeout(() => resolve(msg.say(stripIndents`
				${msg.author} you wanted me to remind you of: '${cleanContent(msg, remind.eventTitle)}'
			`)), time);
		});

		return [preRemind, remindMessage];
	}
};

function cleanContent(msg, content) {
    return content.replace(/@everyone/g, '@\u200Beveryone')
        .replace(/@here/g, '@\u200Bhere')
        .replace(/<@&[0-9]+>/g, roles => {
            const replaceID = roles.replace(/<|&|>|@/g, '');
            const role = msg.channel.guild.roles.get(replaceID);

            return `@${role.name}`;
        })
        .replace(/<@!?[0-9]+>/g, user => {
            const replaceID = user.replace(/<|!|>|@/g, '');
            const member = msg.channel.guild.members.get(replaceID);

            return `@${member.user.username}`;
        });
}

const Sherlock = require('sherlockjs');
const moment = require('moment');

exports.run = async (client, msg) => {
  let embed = new client.methods.Embed()
  const s = Sherlock.parse(msg.content);
  const relative = s.startDate.getTime() - Date.now();
  s.eventTitle = s.eventTitle.replace(/^me to ?|^me ?|^to ?/, '');
  msg.channel.send(`I will remind you to ${s.eventTitle} ${moment().add(relative, 'ms').fromNow()}.`);
  setTimeout(() => {
    let final = `${s.eventTitle}`;
    embed.setAuthor("REMINDER")
    .setDescription(final)
    .setTimestamp()
    msg.author.send({embed})
  }, relative);
};