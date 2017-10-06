exports.run = (client, message) => {
	let sayMessage = message.content.split(/\s+/g).slice(1).join(" ");
	if(!sayMessage) return message.channel.send('Please specify something for me to say.')
		message.delete().catch(O_o=>{})
        	return message.channel.send(sayMessage).catch(console.error);
}