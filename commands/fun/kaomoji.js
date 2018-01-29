const { Command } = require('../../commando');
const kaomojis = require('../../assets/json/kaomoji')
const total = Object.keys(kaomojis)

module.exports = class KaomojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kaomoji',
            guildOnly: true,
            aliases: ['lenny', 'face', 'emoticon'],
            group: 'fun',
            memberName: 'kaomoji',
            description: 'Displays a random kaomoji! (´・ω・｀) 3000 will definitely be enough to keep you busy! (ｖ｀▽´)ｖ',
            details: 'Available categories: `angry` `confused` `congrats` `crazy` `exited` `happy` `hungry` `hurt` `love` `sad` `scared` `shrug` `shy` `smug` `success` `surprised` `thanks` `worried`',
            examples: ['~kaomoji <emotion>'],
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
        var { emotion } = args;


        if (emotion == 'random') {
            var random = total[Math.floor(Math.random() * total.length - 1)];
            var face = kaomojis[random];
            return message.channel.send(face[Math.round(Math.random() * (face.length - 1))]);

        } else {
            emotion = kaomojis[emotion[Math.round(Math.random() * (emotion.length - 1))]];
            return message.channel.send(emotion);
        }
    }
}