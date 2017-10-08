/* Yes I know this is very ugly and underdeveloped coding
*  can't say much more than sHUT tHE HECK UP this is my first time coding 
*  hecking hell coding is the hardest thing 
*  i did reference off of other open-sourced discord.js bots
*  do not steal my token kthnx
*/
//botURL = https://discordapp.com/api/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=2083912831 
const moment = require('moment')
const tz = require('moment-timezone')
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const auth = require("./auth.json");
const prefix = '~'

client.login('MzY1OTA3NjQ1Nzk1Nzk0OTQ2.DLqKPw.AyTLOnGqxlahYZG5xTs6LIolVGs');

//ready and game status, message ready to main server
client.on("ready", () => {
	client.consts = require('./consts.js');
	client.user.setPresence({ game: { name: 'with you | ~help', type: 0 } });

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

			if(message.content == '<@365907645795794946> help' || message.content == '<@!365907645795794946> help') {
				const embed = new Discord.RichEmbed()
					.setAuthor(`Komugari`, client.user.displayAvatarURL)
    				.setColor('#727293')
       				.setThumbnail(client.user.displayAvatarURL)
				    .setFooter(`Any message from the me can be removed by reacting with a 🎴 emoji.`)
					.setDescription('Hi! I\'m Komugari and I am a bot based around anime, memes, and NSFW!')
					.addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=2083912831)`, true)
					.addField(`__Support:__`, `\`~support [message]\``, true)					
        			.addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`)
     			return message.channel.send({embed}).then(m=>m.react("🎴"))
			}

			//time formatting for private use

			var serverIDs = ['198399488614727680', '202075400225030144']

			if(message.content.startsWith('<@365907645795794946> time') || message.content.startsWith('<@!365907645795794946> time')) {
				if (serverIDs.indexOf(message.guild.id) > -1) {

					var timeZone = moment(moment().format());
					var spetTime = timeZone.tz('America/Toronto').format('MMM Do, HH:mm');
					var keyreenTime = timeZone.tz('Europe/Kiev').format('MMM Do, HH:mm');
					var kodicksTime = timeZone.tz('Asia/Manila').format('MMM Do, HH:mm'); 

					var embed = new Discord.RichEmbed()
						.setColor('#8FB3C3')
						.addField('keyreen', keyreenTime)
						.addField('kodicks', kodicksTime)
						.addField('spet', spetTime)
						.setThumbnail('https://cdn.discordapp.com/emojis/358680862734286873.png')
					return message.channel.send({embed})
				} else {
					return message.channel.send('<:KeyreenShrug:358696826314162189>')
				}
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
			let commandFile = require(`./commands/memes/${command}.js`);
			commandFile.run(client, message, Discord, args);
		  } catch (err) {
			  //intentionally blank because I'm too lazy to use discord.js-commando
		  } try {
			let commandFile = require(`./commands/nsfw/${command}.js`);
			commandFile.run(client, message, Discord, args);
		  } catch (err) {
			  //intentionally blank because I'm too lazy to use discord.js-commando
		  } try {
			let commandFile = require(`./commands/search/${command}.js`);
			commandFile.run(client, message, Discord, args);
		  } catch(err) {
			  //intentionally blank because I'm too lazy to use discord.js-commando
		  } try {
			  let commandFile = require(`./commands/anime/${command}.js`)
			  commandFile.run(client, message, Discord, args);
		  } catch(err) {
			  //intentionally blank because I'm too lazy to use discord.js-commando
		  } try {
			let commandFile = require(`./commands/action/${command}.js`)
			commandFile.run(client, message, Discord, args);
		  } catch(err) {
			  //intentionally blank because I'm too lazy to use discord.js-commando
		  } try {
			let commandFile = require(`./commands/utility/${command}.js`);
			commandFile.run(client, message, Discord, args);
		  } catch(err) {
			  //intentionally blank because I'm too lazy to use discord.js-commando
		  } try {
			  let commandFile = require(`./commands/fun/${command}.js`)
			  commandFile.run(client, message, Discord, args);
		  } catch(err) {
			  //intentionally blank because I'm too lazy to use discord.js-commando
		  } try {
			let commandFile = require(`./commands/info/${command}.js`)
			commandFile.run(client, message, Discord, args);
		  } catch(err) {
			  //intentionally blank because I'm too lazy to use discord.js-commando
		  }
});

//removes bot's message if reacted with card thing
client.on("messageReactionAdd", (messageReaction, user) => {
	if(messageReaction.message.author.id !== '365907645795794946') return;
	if(user.bot) return;
	if(messageReaction.emoji == '🎴') {
        messageReaction.message.delete();
      }
})