/* Yes I know this is very ugly and underdeveloped coding
*  can't say much more than sHUT tHE HECK UP this is my first time coding 
*  hecking hell coding is the hardest thing 
*  i did reference off of other open-sourced discord.js bots.
*/
//botURL = https://discordapp.com/api/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=2083912831 
const Discord = require("discord.js");
const client = new Discord.Client();
const auth = require("./auth.json");
const prefix = '~'

client.login('MzY1OTA3NjQ1Nzk1Nzk0OTQ2.DLlVYQ.Wlv4fhVVRI2XLkSgXTqwPkTCQQU');

//ready and game status, message ready to main server
client.on("ready", () => {
	client.consts = require('./consts.js');
	client.user.setPresence({ game: { name: '~help', type: 0 } });

	console.log(`Komugari is live an ready in ${client.guilds.size} guilds.`);

	var channel = client.channels.get('198399488614727680');
	channel.send(`Ding`);
});

client.on('guildCreate', guild => {
	var channel = client.channels.get('198399488614727680')
		channel.send(`Komugari was added to ${guild.name}, it has a total of ${guild.members.size} members, and ${guild.channels.size} channels. It is owned by ${guild.owner.user}. (ID: ${guild.id})`)
});
client.on('guildDelete', guild => {
	var channel = client.channels.get('198399488614727680')
		channel.send(`Komugari was removed from ${guild.name}, it has a total of ${guild.members.size} members, and ${guild.channels.size} channels. It is owned by ${guild.owner.user}. (ID: ${guild.id})`)
});

//basic message replies
client.on("message", message => {
	if(message.author.bot)return;
		try {
			if(message.content.includes('press f')){
				message.react('🇫');
			}

			if(message.content == '<@329722471295221760> help') {
				const embed = new Discord.RichEmbed()
					.setAuthor(`Komugari`, client.user.displayAvatarURL)
    				.setColor('#727293')
       				.setThumbnail(client.user.displayAvatarURL)
				    .setFooter(`Any message from the me can be removed by reacting with a 🎴 emoji.`)
					.setDescription('Hi! I\'m Komugari and I am a bot based around anime, memes, and NSFW!')
					.addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=2083912831)`, true)
					.addField(`__Source Code!:__`, `[DysphoriAlluka/Komugari](https://github.com/DysphoriAlluka/Komugari)`)
        			.addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`)
        			.addField(`__Support:__`, `Contact Mako#8739 for direct support.\n\Or use \`~support [message]\` to send a support message.`);
     			return message.channel.send({embed}).then(m=>m.react("🎴"))
			}

			if(message.content == '<@!329722471295221760> help') {
				const embed = new Discord.RichEmbed()
					.setAuthor(`Komugari`, client.user.displayAvatarURL)
					.setColor('#727293')
				    .setThumbnail(client.user.displayAvatarURL)
					.setFooter(`Any message from the me can be removed by reacting with a 🎴 emoji.`)
					.setDescription('Hi! I\'m Komugari and I am a bot based around anime, memes, and NSFW!')
					.addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=2083912831)`, true)
					.addField(`__Source Code!:__`, `[DysphoriAlluka/Komugari](https://github.com/DysphoriAlluka/Komugari)`)
					.addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`)
					.addField(`__Support:__`, `Contact Mako#8739 for direct support.\n\Or use \`~support [message]\` to send a support message.`);
			 return message.channel.send({embed}).then(m=>m.react("🎴"))
			}
		} catch(err) {
			console.log(err)
		}
		  const args = message.content.split(" "); 
		
		  if (!message.content.startsWith(prefix)) return;
		
		  //COMMAND Handler
		  const org = args.shift().slice(prefix.length);
		  const command = org.toLowerCase()

		  try {
			let commandFile = require(`./commands/${command}.js`);
			commandFile.run(client, message, Discord, args);
		  } catch (err) {
			return console.log(`${command} is not a valid command.`);
		  }
}); 	

//removes bot's message if reacted with card thing
client.on("messageReactionAdd", (messageReaction, user) => {
	if(messageReaction.message.author.id !== '329722471295221760') return;
	if(user.bot) return;
	if(messageReaction.emoji == '🎴') {
        messageReaction.message.delete();
      }
})