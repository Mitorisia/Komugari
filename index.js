/* Code by Mako#8739 with the help of many other open sourced discord.js bots!!
 *  A GREAT BIG thank you to the discord.js community for answering all my dumb questions!!!
 *  if you see any similarities in my code that was clearly references off of yours, please do tell, I'll give as much credit as I can for your help!!
 *  ^^ i can't really give credits as of now (near completion), as I don't remember the specific repositories that I referenced off of QwQ
 */
//botURL = https://discordapp.com/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=305523782

require('dotenv').config()
const moment = require('moment');
const tz = require('moment-timezone');
const snekfetch = require('snekfetch');

const { CommandoClient } = require('./commando');
const client = new CommandoClient({
    commandPrefix: '~',
    owner: '180050347589369856',
    invite: 'https://discord.gg/dHqWWSS',
    disableEveryone: true,
    unknownCommandResponse: false,
    //messageCacheMaxSize	= 50,
    disabledEvents: [
        'typingStart',
        'messageDelete',
        'messageUpdate',

        'userUpdate',

        'voiceStateUpdate',
        'guildMemberSpeaking'
    ]
});
const Discord = require('discord.js');

const auth = require("./auth.json");
const { fromNow } =  require('./index')


const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
const explicitContentFilters = ['None', 'Scan messages from those without a role', 'Scan all messages']


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['action', 'Action'],
        ['anime', 'Anime'],
        ['music', 'Music'],
        ['fun', 'Fun'],
        ['core', 'Core'],
        ['info', 'Info'],
        ['memes', 'Memes'],
        ['moderation', 'Moderation'],
        ['nsfw', 'NSFW'],
        ['utility', 'Utility'],
        ['owner', 'Hidden + Owner']
    ])
    .registerCommandsIn(__dirname + "/commands");


client.on('reconnecting', () => {
    console.log('I am reconnecting now!');
}).on('resume', () => {
    console.log('Reconnected! I\'m back on track!');
}).on('disconnect', () => {
    console.log('Disconnected from the server... just thought I\'d let you know!');
})

/*
setInterval(function() {
	snekfetch.get("http://komugari.herokuapp.com");
}, 500000); // prevents sleeping
*/

//ready and game status, message ready to main server
client.on("ready", () => {

    //client.user.setActivity('with you | ~help')

    client.user.setActivity('I am still incomplete! Take caution, uptime is never guaranteed!')

    var channel = client.channels.get('367828468366573570');
    const embed = new Discord.MessageEmbed()
        .setAuthor('Komugari has (re)started!', client.user.displayAvatarURL({ format: 'png' }))
        .setColor('#727293')
        .setDescription(`Serving ${client.users.size} users in ${client.guilds.size} servers and ${client.channels.size} channels!\n\**Commands:** ${client.registry.commands.size}`)
        .setTimestamp();
	channel.send({ embed });

	return console.log(`Komugari is live and ready in ${client.guilds.size} servers!`)
	
});


client.on('guildCreate', guild => {
    var channel = client.channels.get('367828773426429953')

    var online = guild.members.filter(m => m.user.presence.status === "online").size
    var bots = guild.members.filter(m => m.user.bot).size
    var highestRole = guild.roles.sort((a, b) => a.position - b.position).map(role => role.toString()).slice(1).reverse()[0]

    var textChannels = guild.channels.filter(c => c.type === 'text');
    var voiceChannels = guild.channels.filter(c => c.type === 'voice');

    const embed = new Discord.MessageEmbed()
        .setAuthor(`Added to ${guild.name}!`, guild.iconURL())
        .setDescription(`Server infomation for **${guild.name}**`)
        .setColor('#78AEE8')
        .setThumbnail(guild.iconURL())
        .addField('❯\u2000\Information', `•\u2000\**ID:** ${guild.id}\n\•\u2000\**${guild.owner ? 'Owner' : 'Owner ID'}:** ${guild.owner ? `${guild.owner.user.tag} (${guild.owner.id})` : guild.ownerID}\n\•\u2000\**Created:** ${moment(guild.createdAt).format('MMMM Do YYYY')} \`(${fromNow(guild.createdAt)})\`\n\•\u2000\**Region:** ${guild.region}\n\•\u2000\**Verification:** ${verificationLevels[guild.verificationLevel]}\n\•\u2000\**Content Filter:** ${explicitContentFilters[guild.explicitContentFilter]}`)
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

	const embed = new Discord.MessageEmbed()
		.setAuthor('Removed from a Server!', guild.iconURL())
		.setColor('#898276')
		.setThumbnail(guild.iconURL())
		.setDescription(`Server infomation for **${guild.name}**`)
		.addField('❯\u2000\Information', `•\u2000\**ID:** ${guild.id}\n\•\u2000\**${guild.owner ? 'Owner' : 'Owner ID'}:** ${guild.owner ? `${guild.owner.user.tag} (${guild.owner.id})` : guild.ownerID}\n\•\u2000\**Created:** ${moment(guild.createdAt).format('MMMM Do YYYY')} \`(${fromNow(guild.createdAt)})\`\n\•\u2000\**Region:** ${guild.region}\n\•\u2000\**Verification:** ${verificationLevels[guild.verificationLevel]}\n\•\u2000\**Content Filter:** ${explicitContentFilters[guild.explicitContentFilter]}`)
		.addField('❯\u2000\Quantitative Statistics', `•\u2000\**Channels** [${guild.channels.size}]: ${textChannels.size} text - ${voiceChannels.size} voice\n\•\u2000\**Members** [${guild.memberCount}]: ${online} online - ${bots} bots\n\•\u2000\**Roles:** ${guild.roles.size}`, true)
		.addField('❯\u2000\Miscellaneous', `•\u2000\**Emojis:** ${guild.emojis.size}`, true)
		.setTimestamp()
		.setFooter(`(${client.guilds.size})`);
	return channel.send({embed});
});


//removes bot's message if reacted with card thing
client.on("messageReactionAdd", async (messageReaction, user) => {
	if(messageReaction.message.author.id !== client.user.id) return undefined;
	if(user.bot) return undefined;
	if(messageReaction.emoji == '🎴') {
		await messageReaction.message.react('🆗');
		await messageReaction.message.react('🇰');
		return messageReaction.message.delete();
      }
})


//basic message replies
client.on("message", async message => {
	if(message.author.bot) return undefined;

	if(message.channel.type == "dm") {
		if(message.content.startsWith('~')) return;
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


	if(message.content.toUpperCase().includes('PRESS F')) {
		message.react('🇫');
		return null;
	}

	if(message.content.toUpperCase().includes('NYA')) {
		message.react('🐱');
		return null;
	}

	if(message.content.toUpperCase().includes('BAKA')) {
		message.react('💢');
		return null;
	}
});

client.login(process.env.TOKEN);