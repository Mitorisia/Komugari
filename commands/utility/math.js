const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const math = require('mathjs');

var types = ['solve', 'simplify', 'parse']

module.exports = class MathCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'math',
            aliases: ['solve'],
            group: 'utility',
            memberName: 'math',
            description: 'I\'ll do your math homework!',
            details: '**Avaliable expression types:**\n\Solve, simplify, parse',
            examples: ['~math [expression]'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [
                {
                    key: 'type',
                    prompt: 'Specify the type of equation for me to solve! ',
                    type: 'string',
                    default: 'solve',
                    validate: type => {
						if (types.includes(type.toLowerCase())) return true;
						return 'That\'s not a valid method! Avaliable types: solve, simplify, parse';
					},
					parse: type => type.toLowerCase()
                },

				{
					key: 'equation',
					prompt: 'Please provide me with an equation to solve!',
					type: 'string'
				}
			]
        });
    }

    run (message, args) {
        var { type, equation } = args;
        if(type == 'solve') {
            try {
                var solution = math.eval(equation)
            } catch(err) {
                console.log(err)
                return message.channel.send(`I couldn\'t solve that equation! \`${err}\``)
            }
            return message.channel.send(solution)
        } else if (!type) {
            return message.channel.send('npo type thansd')
        }
        
        
	}
}