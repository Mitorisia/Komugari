const { Command } = require('../../commando');
const kaomojis = require('../../assets/json/kaomoji')

module.exports = class KaomojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kaomoji',
            guildOnly: true,
            aliases: ['lenny', 'face', 'emoticon'],
            group: 'fun',
            memberName: 'kaomoji',
            description: 'Displays a random kaomoji! (´・ω・｀) 3000 will definitely be enough to keep you busy! (ｖ｀▽´)ｖ',
            examples: ['~kaomoji'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'emotion',
                prompt: 'Please enter a valid kaomoji emotion!',
                type: 'string',
                default: 'random',
                validate: emotion => {
                    if (kaomojis.includes(emotion.toLowerCase())) return true;
                    return 'Invalid kaomoji category! Use `~help kaomoji` for a list of valid kaomojis!';
                },
                parse: sign => sign.toLowerCase()
            }]
        });
    }

    run(message, args) {

        var face = kaomojis[Math.round(Math.random() * (face.length - 1))];
        return message.channel.send(face);
    }
}