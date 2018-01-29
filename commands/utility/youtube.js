const { Command } = require('../../commando');
const Discord = require('discord.js');
var youtube_node = require('youtube-node');
youtube = new youtube_node();
youtube.setKey(process.env.YOUTUBEKEY);
youtube.addParam('type', 'video');

module.exports = class YouTubeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            aliases: ['yt', 'video'],
            group: 'utility',
            memberName: 'youtube',
            guildOnly: true,
            description: 'Searches for your query on YouTube!',
            examples: ['~youtube [query]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run(message) {
        var query = message.content.split(/\s+/g).slice(1).join(" ");
        try {
            youtube.search(query, 1, function(error, result) {
                if (!query) {
                    return message.channel.send('Please provide me with something to search!');
                }
                if (error) {
                    return message.channel.send("There was an error executing that search!");

                } else {
                    if (!result || !result.items || result.items.length < 1) {
                        return message.channel.send(`No results found for **${query}**`);
                    } else if (!result.items[0].id.videoId) {
                        return message.channel.send(`No results found for **${query}**`);
                    } else {
                        return message.channel.send(`<:youtubBwwWOWWwowwWOWwthanks:341350435312893953> **${query}** (http://www.youtube.com/watch?v=${result.items[0].id.videoId})`);
                    }
                }
            });

        } catch (err) {

            return message.channel.send('<:NOTLIKETHIIIIIIIIIIIIIIIIIIIIIIS:371071292146843658> Something went wrong while executing that command!');
        }
    }
}