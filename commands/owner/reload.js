const { Command } = require('../../commando');
const stripIndents = require('common-tags')

function disambiguation(items, label, property = 'name') {
	const itemList = items.map(item => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
	return `Multiple ${label} found, please be more specific!`;
}

module.exports = class ReloadCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			aliases: ['reload-command'],
			group: 'owner',
			memberName: 'reload',
			description: 'Reloads a command or command group.',
			details: 'This is an owner-only command!',
			examples: ['~reload help'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Which command or group would you like to reload?',
					validate: val => {
						if(!val) return false;
						const groups = this.client.registry.findGroups(val);
						if(groups.length === 1) return true;
						const commands = this.client.registry.findCommands(val);
						if(commands.length === 1) return true;
						if(commands.length === 0 && groups.length === 0) return false;
						return `${commands.length > 1 ? disambiguation(commands, 'commands') : ''}\n${groups.length > 1 ? disambiguation(groups, 'groups') : ''}`;
					},
					parse: val => this.client.registry.findGroups(val)[0] || this.client.registry.findCommands(val)[0]
				}
			]
		});
	}

	hasPermission(message) {
		return this.client.isOwner(message.author);
	}

	async run(message, args) {
		args.cmdOrGrp.reload();
		if(args.cmdOrGrp.group) {
			await message.channel.send(`Reloaded \`${args.cmdOrGrp.name}\` command!`);
		} else {
			await message.channel.send(`Reloaded all of the commands in the \`${args.cmdOrGrp.name}\` group!`);
		}
		return null;
	}
};
