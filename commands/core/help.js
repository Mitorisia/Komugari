const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'core',
			memberName: 'help',
            description: 'Displays basic information or help for a command!',
			examples: ['~help <command>'],
			args: [
				{
					key: 'command',
					prompt: 'Please provide me a command to search for!',
					type: 'string',
					default: ''
				}
			]
		});
	}

	run (message, args) {		
		const { command } = args;
		const commands = this.client.registry.findCommands(command, false);
		if (command) {
			if (commands.length === 1) {
				const embed = new Discord.MessageEmbed()
					.setAuthor(commands[0].name, 'https://a.safe.moe/55XCQ.png')
					.setColor('#727293')
					.setDescription(`${commands[0].description}\n${commands[0].details || ''}`)
					.addField('__Usage:__', commands[0].examples[0], true)
					.addField('__Aliases:__', commands[0].aliases.join(', ') || 'None', true)
					.setFooter(`${commands[0].group.name} | Any message from me can be removed by reacting with a 🎴 emoji!`);
				return message.channel.send({embed});  
				
			} else if (commands.length > 1) {
				return message.channel.send(`Multiple commands found! ${commands.map(c => c.name).join(', ')}`);
			} else {
				const embed = new Discord.MessageEmbed()
                	.setAuthor(`Komugari`, 'https://a.safe.moe/55XCQ.png')
                	.setColor('#727293')
                	.setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
                	.setFooter(`Mako#8739 | Any message from the me can be removed by reacting with a 🎴 emoji!`)
                	.setDescription('Hi! I\'m Komugari and I am a bot based around anime and NSFW!\n\All my commands start with the prefix "~"!')
                	.addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=305523782)`, true)
                	.addField(`__Support:__`, `[\`~support [message]\`](https://discord.gg/dHqWWSS)`, true)
                	.addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`);
				return message.channel.send(`The command **${command}** was not found!`, {embed: embed});
			}
		} else {
			const embed = new Discord.MessageEmbed()
				.setAuthor(`Komugari`, 'https://a.safe.moe/55XCQ.png')
				.setColor('#727293')
				.setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
				.setFooter(`Mako#8739 | Any message from the me can be removed by reacting with a 🎴 emoji!`)
				.setDescription('Hi! I\'m Komugari and I am a bot based around anime and NSFW!\n\All my commands start with the prefix "~"!')
				.addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=305523782)`, true)
				.addField(`__Support:__`, `[\`~support [message]\`](https://discord.gg/dHqWWSS)`, true)
				.addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`);
		return message.channel.send({embed});
		}
	};
};
