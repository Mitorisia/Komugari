/* Code by Mako#8739 with the help of many other open sourced discord.js bots!!
*  A GREAT BIG thank you to the discord.js community for answering all my dumb questions!!!
*  if you see any similarities in my code that was clearly references off of yours, please do tell, I'll give as much credit as I can for your help!!
*  ^^ i can't really give credits as of now (near completion), as I don't remember the specific repositories that I referenced off of QwQ
*/ 
//botURL = https://discordapp.com/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=305523782

const moment = require('moment');
const tz = require('moment-timezone');

const { CommandoClient } = require('discord.js-commando');
const client = new CommandoClient({
    commandPrefix: '~',
	owner: '180050347589369856',
	invite: 'https://discord.gg/dHqWWSS',
	disableEveryone: true,
	unknownCommandResponse: false
});
const Discord = require('discord.js');

const auth = require("./auth.json");
const PREFIX = '~';


client.registry
	.registerDefaultTypes()
	.registerGroups([
		['action', 'Action'], 
		['anime', 'Anime'],
		['voice', 'Voice'],
		['fun', 'Fun'],
		['core', 'Core'],
		['info', 'Info'],
		['memes', 'Memes'],
		['moderation', 'Moderation'],
		['nsfw', 'NSFW'],
		['utility', 'Utility'],
		['owner','Owner']
	])
	.registerCommandsIn(__dirname + "/commands");


client.on('disconnect', () => console.log('Disconnected from the server...just thought I\'d let you know!'));
	
client.on('reconnecting', () => console.log('I am reconnecting now!'));


//ready and game status, message ready to main server
client.on("ready", () => {
	//client.user.setActivity('with you | ~help')

	client.user.setActivity('I am still incomplete! Take caution, uptime is never guaranteed!')

	console.log(`Komugari is live and ready in ${client.guilds.size} guilds.`);

	var channel = client.channels.get('367828468366573570');
	const embed = new Discord.MessageEmbed()
		.setAuthor('Komugari is live and ready!', client.user.displayAvatarURL({ format: 'png' }))
		.setColor('#727293')
		.setDescription(`Serving ${client.users.size} users in ${client.guilds.size} servers and ${client.channels.size} channels!`)
		.setTimestamp();
	channel.send({embed});
});


client.on('guildCreate', guild => {
	var channel = client.channels.get('367828773426429953')

	var online = guild.members.filter(m => m.user.presence.status === "online").size
	var bots = guild.members.filter(m => m.user.bot).size	
	var highestRole = guild.roles.sort((a, b) => a.position - b.position).map(role => role.toString()).slice(1).reverse()[0]

	var textChannels = guild.channels.filter(c => c.type === 'text');
	var voiceChannels = guild.channels.filter(c => c.type === 'voice');

	const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
	const explicitContentFilters = ['None', 'Scan messages from those without a role', 'Scan all messages']

	function fromNow(date) {
		if (!date) {
			return false;
		  }
		
		  const ms = new Date().getTime() - date.getTime();
		
		  if (ms >= 86400000) {
			const days = Math.floor(ms / 86400000);
			return `${days} day${days !== 1 ? 's' : ''} ago`;
		  }
		
		  return `${this.humanizeDuration(ms, 1, false, false)} ago`;
	} 

	const embed = new Discord.MessageEmbed()
		.setAuthor(`Added to ${guild.name}!`, guild.iconURL())
		.setDescription(`Server infomation for **${guild.name}**`)
		.setColor('#78AEE8')
		.setThumbnail(guild.iconURL())
		.addField('❯\u2000\Information', `•\u2000\**ID:** ${guild.id}\n\•\u2000\**${guild.owner ? 'Owner' : 'Owner ID'}:** ${guild.owner ? `${guild.owner.user} (${guild.owner.id})` : guild.ownerID}\n\•\u2000\**Created:** ${moment(guild.createdAt).format('MMMM Do YYYY')} (${fromNow(guild.createdAt)})\n\•\u2000\**Region:** ${guild.region}\n\•\u2000\**Verification:** ${verificationLevels[guild.verificationLevel]}\n\•\u2000\**Content Filter:** ${explicitContentFilters[guild.explicitContentFilter]}`)
		.addField('❯\u2000\Quantitative Statistics', `•\u2000\**Channels** [${guild.channels.size}]: ${textChannels.size} text - ${voiceChannels.size} voice\n\•\u2000\**Members** [${guild.memberCount}]: ${online} online - ${bots} bots\n\•\u2000\**Roles:** ${guild.roles.size}`, true)
		.addField('❯\u2000\Miscellaneous', `•\u2000\**Emojis:** ${guild.emojis.size}`, true)            
		.setTimestamp()
		.setFooter(`(${client.guilds.size})`);
		return channel.send({embed});
});

client.on('guildDelete', guild => {
	var channel = client.channels.get('367828773426429953');

	var online = guild.members.filter(m => m.user.presence.status === "online").size
	var bots = guild.members.filter(m => m.user.bot).size	
	var highestRole = guild.roles.sort((a, b) => a.position - b.position).map(role => role.toString()).slice(1).reverse()[0]

	var textChannels = guild.channels.filter(c => c.type === 'text');
	var voiceChannels = guild.channels.filter(c => c.type === 'voice');

	const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
	const explicitContentFilters = ['None', 'Scan messages from those without a role', 'Scan all messages']

	function fromNow(date) {
		if (!date) {
			return false;
		  }
		
		  const ms = new Date().getTime() - date.getTime();
		
		  if (ms >= 86400000) {
			const days = Math.floor(ms / 86400000);
			return `${days} day${days !== 1 ? 's' : ''} ago`;
		  }
		
		  return `${this.humanizeDuration(ms, 1, false, false)} ago`;
	} 

	const embed = new Discord.MessageEmbed()
		.setAuthor('Removed from a Server!', guild.iconURL())
		.setColor('#898276')
		.setThumbnail(guild.iconURL())
		.setDescription(`Server infomation for **${guild.name}**`)
		.addField('❯\u2000\Information', `•\u2000\**ID:** ${guild.id}\n\•\u2000\**${guild.owner ? 'Owner' : 'Owner ID'}:** ${guild.owner ? `${guild.owner.user} (${guild.owner.id})` : guild.ownerID}\n\•\u2000\**Created:** ${moment(guild.createdAt).format('MMMM Do YYYY')} (${fromNow(guild.createdAt)})\n\•\u2000\**Region:** ${guild.region}\n\•\u2000\**Verification:** ${verificationLevels[guild.verificationLevel]}\n\•\u2000\**Content Filter:** ${explicitContentFilters[guild.explicitContentFilter]}`)
		.addField('❯\u2000\Quantitative Statistics', `•\u2000\**Channels** [${guild.channels.size}]: ${textChannels.size} text - ${voiceChannels.size} voice\n\•\u2000\**Members** [${guild.memberCount}]: ${online} online - ${bots} bots\n\•\u2000\**Roles:** ${guild.roles.size}`, true)
		.addField('❯\u2000\Miscellaneous', `•\u2000\**Emojis:** ${guild.emojis.size}`, true)   
		.setTimestamp()
		.setFooter(`(${client.guilds.size})`);
	return channel.send({embed});
});


//removes bot's message if reacted with card thing
client.on("messageReactionAdd", (messageReaction, user) => {
	if(messageReaction.message.author.id !== '365907645795794946') return undefined;
	if(user.bot) return undefined;
	if(messageReaction.emoji == '🎴') {
		messageReaction.message.delete();
      }
})


//basic message replies
client.on("message", async message => {
	if(message.author.bot) return undefined;
	
	if(message.channel.type == "dm") {
		var channel = client.channels.get('370719709110468609');

		const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setDescription(message.content)
			.setColor('#D48AD8')
			.setTimestamp();
		channel.send({embed});
		return message.channel.send('Your message has been sent to the support server! https://discord.gg/dHqWWSS');
	}

	if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return undefined;

		try {
			if(message.content.includes('press f')) {
				message.react('🇫');
			}

			if(message.content.includes('nya')) {
				message.react('🐱');
			}

			//time formatting for private use

			var serverIDs = ['367828773426429953', '202075400225030144']

			if(message.content.startsWith('<@365907645795794946> keyreen') || message.content.startsWith('<@!365907645795794946> keyreen') || message.content.startsWith('<@365907645795794946> kodick') || message.content.startsWith('<@!365907645795794946> kodick') || message.content.startsWith('<@365907645795794946> spet') || message.content.startsWith('<@!365907645795794946> spet')) {
				if (serverIDs.indexOf(message.guild.id) > -1) {

					var timeZone = moment(moment().format());
					var spetTime = timeZone.tz('America/Toronto').format('MMM Do, HH:mm');
					var keyreenTime = timeZone.tz('Europe/Kiev').format('MMM Do, HH:mm');
					var kodicksTime = timeZone.tz('Asia/Manila').format('MMM Do, HH:mm'); 

					var embed = new Discord.MessageEmbed()
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
			return message.channel.send("Something went wrong while executing that function!")
		}

});


client.login('MzY1OTA3NjQ1Nzk1Nzk0OTQ2.DLqKPw.AyTLOnGqxlahYZG5xTs6LIolVGs');