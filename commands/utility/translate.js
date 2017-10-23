const { Command } = require('../../commando');
const Discord = require('discord.js');
const translate = require('google-translate-api');

module.exports = class TranslateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'translate',
            aliases: ['tl', 'translate', 'trans'],
            group: 'utility',
            memberName: 'translate',
            guildOnly: true,
            description: 'Translates your text into the desired language!',
            examples: ['~translate [language] [text]'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    }

    run (message) {
      const lang = message.content.split(/\s+/g)[1];
      const input = message.content.split(/\s+/g).slice(2).join(" ");
    
      if (!lang) {
        return message.channel.send('You must provide a language and some text to translate!')
      }
      
      try {
        translate(input, {to: lang}).then(res => {
          const embed = new Discord.MessageEmbed()
              .setAuthor('Translated Text:')
              .setDescription(`**From:** __\`[auto]\`\n\__**To:** __\`${lang}\`__`)
              .setColor('#4c8bf5')
              .setFooter('Google Translate', 'https://a.safe.moe/2jXgX.png')
              .addField('📥 Input', `\`\`\`${input}\`\`\``)
              .addField('📤 Output', `\`\`\`${res.text}\`\`\``);
          return message.channel.send({embed});
        })
        
      } catch(err) {
        return message.channel.send(`<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that command! \`${err}\``);
      }
	}
}