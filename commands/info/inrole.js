const { Command } = require('discord.js-commando');
const Discord = require('discord.js');


module.exports = class InRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'inrole',
            aliases: ['rolecount', 'membercount'],
            group: 'info',
            memberName: 'inrole',
            description: 'Gets all the members from a given role!',
            examples: ['~inrole [role]'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [
				{
					key: 'role',
					prompt: 'Please provide me with a role to get the information of!',
					type: 'role',
					default: ''
				}
			]
        });
    }

    run (message, args) {
        let somethingThere = message.content.split(/\s+/g).slice(1).join(" ");
                
        if(!somethingThere) {
            return message.channel.send('Please give me a role to get the information of!\n\Please say `~roles` to get all the roles in this server!')        
        }
        
        const { role } = args;
        let members = role.members;

        var allMembers = members.sort((a, b) => a.user.tag.localeCompare(b.user.tag)).map(m => {
            return `${m.user.tag}${(m.user.bot ? ' **`[BOT]`**' : '')}`
        }).join(', ')

        if(allMembers.length > 2048) return message.channel.send('Too much members in that role! I couldn\'t send the information!');
        
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${role.name}`, message.guild.iconURL())
            .setColor(role.hexColor)
            .setDescription(allMembers)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());         
        return message.channel.send(`Here's all the members with the ${role.name} role!`, {embed: embed});
	}
}

  