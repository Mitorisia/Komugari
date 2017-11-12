const { Command } = require('../../commando');
const Discord = require('discord.js');


module.exports = class RegionalsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'regionals',
            guildOnly: true,
            aliases: ['letters', 'bigtext', 'big', 'textmoji', 'bigmoji'],
            group: 'fun',
            memberName: 'regionals',
            description: 'Converts your given text into regional indicators!',
            examples: ['~regionals [text]'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'text',
                prompt: 'Please provide me some text to render!',
                type: 'string'
            }]
        });
    }

    async run(message, args) {
        var output = ''
        for (let c of args.text.toLowerCase()) {
            if (c in map) {
                c = map[c] + '\u200b'
            }
            output += c
        }

        return message.channel.send('\u200b' + output)
    }
}

const map = {
    a: '🇦',
    b: '🇧',
    c: '🇨',
    d: '🇩',
    e: '🇪',
    f: '🇫',
    g: '🇬',
    h: '🇭',
    i: '🇮',
    j: '🇯',
    k: '🇰',
    l: '🇱',
    m: '🇲',
    n: '🇳',
    o: '🇴',
    p: '🇵',
    q: '🇶',
    r: '🇷',
    s: '🇸',
    t: '🇹',
    u: '🇺',
    v: '🇻',
    w: '🇼',
    x: '🇽',
    y: '🇾',
    z: '🇿',
    0: '0⃣',
    1: '1⃣',
    2: '2⃣',
    3: '3⃣',
    4: '4⃣',
    5: '5⃣',
    6: '6⃣',
    7: '7⃣',
    8: '8⃣',
    9: '9⃣',
    '#': '#⃣',
    '*': '*⃣',
    '!': '❗',
    '?': '❓',
}