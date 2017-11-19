const { Command } = require('../../commando');

module.exports = class BCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'b',
            guildOnly: true,
            aliases: ['bmoji'],
            group: 'fun',
            memberName: 'b',
            description: 'Converts your text to 🅱 text!',
            examples: ['~b [text]'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: "text",
                prompt: "What text do you want to do B on?\n",
                type: "string",
                default: 'traps are not gay',
                parse: text => text.toLowerCase(),
                validate: value => {
                    if (this.B(value.toLowerCase()).length < 2000) return true;
                    return `The output is over 2000 characters! Please try again!`
                }
            }],
        });
    }

    B(text) {
        return text.replace(new RegExp(/(b|d|g|p|q|t|h)/gi), "🅱");
    }

    run (message, args) {
        var { text } = args;
        
        return message.channel.send(this.B(text));
	}
}