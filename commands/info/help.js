const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'info',
			memberName: 'help',
            description: 'Displays basic information or help for a command!',
            examples: ['~help <command>']
		});
	}

	run (message) {
		var helpCommand = message.content.split(/\s+/g)[1];
		const commands = this.client.registry.findCommands(helpCommand, false);
		if (helpCommand) {
			if (helpCommand) {
				const embed = new Discord.MessageEmbed()
				.setAuthor(commands[0].name, this.client.user.displayAvatarURL())
				.setColor('#727293')
				.setDescription(stripIndents`
				${commands[0].description}
				${commands[0].details || ''}
			`)
				.addField('__Usage:__', commands[0].examples[0], true)
				.addField('__Aliases:__', commands[0].aliases.join(', ') || 'None', true)
				.setFooter(`${commands[0].group.name} | Any message from me can be removed by reacting with a 🎴 emoji.`);
				return message.channel.send({embed});  
				
			} else {
				const embed = new Discord.MessageEmbed()
                    .setAuthor(`Komugari`, this.client.user.displayAvatarURL())
                    .setColor('#727293')
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setFooter(`Mako#8739 | Any message from the me can be removed by reacting with a 🎴 emoji.`)
                    .setDescription('Hi! I\'m Komugari and I am a bot based around anime, memes, and NSFW!')
                    .addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=305523782)`, true)
                    .addField(`__Support:__`, `\`~support [message]\``, true)
                    .addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`);
                return message.channel.send(`The command **${helpCommand}** was not found!`, {embed: embed});
            };
            
		} else {
			const embed = new Discord.MessageEmbed()
                .setAuthor(`Komugari`, this.client.user.displayAvatarURL())
                .setColor('#727293')
                .setThumbnail(this.client.user.displayAvatarURL())
                .setFooter(`Mako#8739 | Any message from the me can be removed by reacting with a 🎴 emoji.`)
                .setDescription('Hi! I\'m Komugari and I am a bot based around anime, memes, and NSFW!')
                .addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=305523782)`, true)
                .addField(`__Support:__`, `\`~support [message]\``, true)
                .addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`);
            return message.channel.send({embed});
		};
	};
};
