exports.run = (client, message) => {
	let sayttsMessage = message.content.split(/\s+/g).slice(1).join(" ");
	if(!sayttsMessage) return message.channel.send('Please specify something for me to send.')
 	    message.delete().catch(O_o=>{})
        	return message.channel.send(sayttsMessage, {tts: true}).catch(console.error);
}