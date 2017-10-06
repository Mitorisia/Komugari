var youtube_node = require('youtube-node');
youtube = new youtube_node();
youtube.setKey('AIzaSyAeSSAdGkMhfK_-jgJlYwP0pB6X6HgIqwA');
youtube.addParam('type', 'video');

exports.run = async (client, message, args) => {
    var query = message.content.split(/\s+/g).slice(1).join(" ");
	youtube.search(query, 1, function(error, result) {
        if(!query) {
            return message.channel.send('Please provide me with something to search!').then(m => m.delete(5000));
        }
			if (error) {
				return message.channel.send("There was an error executing that search.").then(m => m.delete(5000));
			}
			else {
				if (!result || !result.items || result.items.length < 1) {
					return message.channel.send(`No results found for **${query}**`);
				} else {
					message.channel.send(`<:youtubBwwWOWWwowwWOWwthanks:341350435312893953> **${query}**(http://www.youtube.com/watch?v=${result.items[0].id.videoId})`);
				}
			}
		});
}