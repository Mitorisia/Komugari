exports.run = (client, message) => {
	let sayMessage = message.content.split(/\s+/g).slice(1).join(" ");
	if(!sayMessage) return message.channel.send('Please specify something for me to say.')
        	return message.channel.send(sayMessage).catch(console.error);
}