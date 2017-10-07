exports.run = (client, message) => {
	let item = message.content.split(/\s+/g).slice(1).join(" ");
	    if(!item) return message.channel.send('Please specify something for me to rate!')
        const rating = Math.floor(Math.random() * 10) + 0;
		return message.channel.send(`I'd give **${item}** a ${rating}/10!`);
}