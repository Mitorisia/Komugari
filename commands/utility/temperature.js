const { Command } = require('../../commando');

module.exports = class TemperatureCommand extends Command {
	constructor(client) {
		super(client, {
            name: 'temperature',
            aliases: ['temp', 'degrees'],
			group: 'utility',
			memberName: 'temperature',
			description: 'Converts temperatures to/from Celsius, Fahrenheit, or Kelvin.',
			args: [
				{
					key: 'base',
					prompt: 'Please provide me a base or a temperature!',
					type: 'string',
					validate: base => {
						if (['celsius', 'fahrenheit', 'kelvin'].includes(base.toLowerCase())) return true;
						return 'Please enter either celsius, fahrenheit, or kelvin!';
					},
					parse: base => base.toLowerCase()
				},
				{
					key: 'to',
					prompt: 'Please provide me a temperature unit to convert to!',
					type: 'string',
					validate: to => {
						if (['celsius', 'fahrenheit', 'kelvin'].includes(to.toLowerCase())) return true;
						return 'Please enter either celsius, fahrenheit, or kelvin!';
					},
					parse: to => to.toLowerCase()
				},
				{
					key: 'amount',
					prompt: 'Please provide me a specified degrees in the unit of the first argument!',
					type: 'integer'
				}
			]
		});
	}

	run(message, args) { // eslint-disable-line consistent-return
        const { base, to, amount } = args;
        
		if (base === to) {
            return message.channel.send(`But... converting **${base}** to **${to}** is the same value...!`);
            
		} else if (base === 'celsius') {
			if (to === 'fahrenheit') return message.channel.send(`🌡 | **${message.author.username}**, ${amount}°C is equivalent to **${(amount * 1.8) + 32}°F!**`);
            else if (to === 'kelvin') return message.channel.send(`🌡 | **${message.author.username}**, ${amount}°C is equivalent to  **${amount + 273.15}°K**!`);
            
		} else if (base === 'fahrenheit') {
			if (to === 'celsius') return message.channel.send(`🌡 | **${message.author.username}**, ${amount}°F is equivalent to **${(amount - 32) / 1.8}°C**!`);
            else if (to === 'kelvin') return message.channel.send(`🌡 | **${message.author.username}**, ${amount}°F is equivalent to **${(amount + 459.67) * (5 / 9)}°K**.`);
            
		} else if (base === 'kelvin') {
			if (to === 'celsius') return message.channel.send(`🌡 | **${message.author.username}**, ${amount}°K is equivalent to **${amount - 273.15}°C**!`);
			else if (to === 'fahrenheit') return message.channel.send(`🌡 | **${message.author.username}**, ${amount}°K is equivalent to **${(amount * 1.8) - 459.67}°F**!`);
		}
	}
};
