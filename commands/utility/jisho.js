const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const wanakana = require('wanakana');

module.exports = class JishoCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'jisho',
                aliases: ['japanese', 'define', 'kanji'],
                group: 'utility',
                memberName: 'jisho',
                guildOnly: true,
                description: 'Searches for Japanese words and kanji on Jisho!',
                examples: ['~jisho [word/kanji/japanese/romaji]'],
                throttling: {
                    usages: 1,
                    duration: 10
                },
                args: [{
                    key: 'word',
                    prompt: 'Please provide me with a word to get the definition of!',
                    type: 'string'
                }]
            });
        }

        async run(message, args) {
                var { word } = args;
                var query = encodeURI(word);

                var res = await snekfetch.get(`https://jisho.org/api/v1/search/words?keyword=${query}`).catch(console.error);
                var jisho = res.body || res.body.toString();

                console.log(jisho);
                if (jisho.data.length > 0) {
                    var content = jisho.data[0];
                    var senses = JSON.stringify(content.senses[0].english_definitions).replace(/\"/g, '').replace(/,/g, '\n');
                    senses = senses.substring(1, senses.length - 1);
                    senses = senses.replace(/^/gm, '•\u2000');
                    senses = senses.replace(/\\/g, "")

                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`${content.japanese[0].word ? content.japanese[0].word : content.japanese[0].reading}`)
                        .setThumbnail('https://a.safe.moe/FB0Qi.png')
                        .setColor('#9678D2')
                        .setDescription(content.is_common ? '`Common Word`' : '`Not a Common Word`' + `\n[External Link](https://jisho.org/search/${query})`)
                        .addField(`❯\u2000\Definition`, `${senses}`)
                        .addBlankField()
                        .addField(`❯\u2000\Reading`, `•\u2000**Kana:** ${content.japanese[0].reading ? content.japanese[0].reading : '`N/A`'}\n\•\u2000**Romāji:** ${wanakana.toRomaji(content.japanese[0].reading)}`);
            return message.channel.send({ embed });

        } else {
            return message.channel.send(`No results found for **${query}**!`);
        }
    }
}