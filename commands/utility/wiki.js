
const { Command } = require('../../commando');
const Discord = require('discord.js');
const wiki = require('wikijs').default;

module.exports = class WikiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wiki',
            aliases: ['encyclopedia', 'wikipedia'],
            group: 'utility',
            memberName: 'wiki',
            guildOnly: true,
            description: 'Searches for your query on Wikipedia!',
            examples: ['~wiki [query]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run (message) {
      const query = message.content.split(/\s+/g).slice(1).join(" ");
      
        if (!query) {
          return message.channel.send('You must specify something to search!');
        }

        const data = await wiki().search(query, 1);
        if (!data.results || !data.results.length) {
          return message.channel.send('No matches found!');
        }
      
        const page = await wiki().page(data.results[0]) ;
        const summary = await page.summary();
        const paragraphs = summary.split('\n');
      
        if (!query.options) {
          paragraphs.length = Math.min(2, paragraphs.length);
        }
        try {
          const embed = new Discord.MessageEmbed()
              .setAuthor(page.raw.title)
              .setDescription(paragraphs.join('\n\n'))
              .addField('Link', `**${page.raw.fullurl}**`)
              .setFooter('Wikipedia', 'https://a.safe.moe/8GCNj.png')
              .setColor('#c7c8ca');
          return message.channel.send(`First search result of \`${query}\` on Wikipedia:`, {embed});
          
        } catch(err) {
          
          return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that command!');
        }
	}
}