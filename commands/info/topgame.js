const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class TopGameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'topgame',
            guildOnly: true,
            aliases: ['topgames', 'tgame', 'games'],
            group: 'info',
            memberName: 'topgame',
            description: 'Displays the most played games in your server!',
            examples: ['~topgame'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    run (message) {
        let games = {};
        message.guild.members.filter(m => !m.user.bot && m.user.presence.game).forEach(member => {
          games[member.user.presence.game.name] = games[member.user.presence.game.name] ? games[member.user.presence.game.name]++ : 1;
        });
    
        var sortable = [];
        Object.keys(games).forEach(name => {
          sortable.push({name: name, value: games[name]});
        });
    
        sortable.sort((a, b) => b.value - a.value);
    
        let text = sortable.map(function(g, i) {
          let line = g.value > 1 ? lang.commands[cmdName].line_plural : commandLang.line_singular;
          return line.replace('{0}', i+1).replace('{1}', g.value).replace('{2}', g.name);
        });
    
        if(text.length > 10) text = text.slice(0, 10);

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Most Played Games in ${message.guild.name}`, message.guild.iconURL())
            .setColor('#846B86')
            .setDescription(text.join("\n"));
        return message.channel.send({ embed });
	}
}