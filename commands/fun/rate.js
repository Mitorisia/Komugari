const { Command } = require('../../commando');

module.exports = class RateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rate',
            aliases: ['ratewaifu'],
            group: 'fun',
            memberName: 'rate',
            guildOnly: true,
            description: 'Gives the item you specify a rating out of 10!',
            examples: ['~rate [item to be rated]'],
        });
    }

    run(message) {
        let item = message.content.split(/\s+/g).slice(1).join(" ");
        if (!item) return message.channel.send('Please specify something for me to rate!');

        if (item.toUpperCase().startsWith("KOMUGARI")) return message.channel.send('I\'d give myself a 10/10!');

        const rating = Math.floor(Math.random() * 10) + 0;
        return message.channel.send(`I'd give **${item}** a ${rating}/10!`);
    }
}