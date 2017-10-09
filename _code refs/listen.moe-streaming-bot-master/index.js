let Eris = require('eris')
let fs = require('fs')
let request = require('request')
let merge = require('merge')
let reload = require('require-reload')(require)
let io = require('socket.io-client')

let config = require('./config.json')

const DISCORD_MSG_LIMIT = 2000
const HELP_MESSAGE = `
'**LISTEN.moe streaming bot by Geo1088 & friends**',

**Usage:**',
    After adding me to your server, join a voice channel and type \`~~join\` to bind me to that channel. Keep in mind that you need to have the \`Manage server\` permission to use this command.

**Commands:**
    **~~join**: Joins current Voice Channel
    **~~np**: Displays the Currently Playing song
    **~~prefix [new prefix]**: Changes the default prefix (\`~~\`) to one of your liking.

For additional commands and help, please visit: <https://github.com/Geo1088/listen.moe-streaming-bot>`

let guilds
try {
    guilds = reload('./guilds.json')
} catch (e) {
    console.log('BAD THING HAPPENED AND GUILDS.JSON DOESNT EXIST AAAAAAAA')
    guilds = {}
}

let c = new Eris.CommandClient(config.token, { userAccount: false }, {
    description: 'LISTEN.moe streaming bot by Geo1088 & friends',
    defaultHelpCommand: false,
    prefix: config.guildDefaults.prefix || '~~',
    // that line actually reminds me, guildDefaults might need to be rethought
    defaultCommandOptions: {
        guildOnly: true
    }
})

let sharedStream = c.createSharedStream(config.stream)

// SOCKET stuff for retrieving radio info
let radioJSON = {}
let socket = io.connect(config.streamInfo)
socket.on('update', function (obj) { try {radioJSON = JSON.parse(obj)} catch(e) { console.log(e)} })

function joinVoice (client, guildId, channel) { // Join a voice channel and start playing the stream there
    let cc = client.voiceConnections.get(guildId) // Find a current connection in this guild
    if (cc) { // If there is one
        // Just switch the channel for this connection
        cc.switchChannel(channel)
        // Config thing
        writeGuildConfig(guildId, {vc: channel})
    } else { // Looks like we'll need to make a new one
        // Create a new voice connection and join the channel
        client.joinVoiceChannel(channel, { shared: true }).then(vc => {
            if (vc) {
                vc.setSpeaking(true)
                sharedStream.voiceConnections.add(vc)
                let realGuild = c.guilds.get(guildId)
                console.log(`Added voice connection for guild ${realGuild.name} (${guildId})`)
            }
        }).catch(error => {
            console.log('Error connecting to channel ' + channel + ' | ' + error)
        })
    }

    // wew that was a lot of comments
}

function writeGuildConfig (guild, object) { // Change a guild's config via an object of options, and save the changes
    var currentConfig = guilds[guild] || {} // Get gurrent config for this guild, creating it if it doesn't exist
    var newConfig = merge(currentConfig, object) // Merge new options with current
    var _guilds = guilds
    _guilds[guild] = newConfig // Write this new config back to the config
    if (!fs.existsSync('./backups'))
        fs.mkdirSync('./backups')
    fs.writeFile(`backups/guilds-${Date.now()}.json`, JSON.stringify(guilds, null, '\t')) // Create a backup before doing anything
    fs.writeFile('guilds.json', JSON.stringify(_guilds, null, '\t'), 'utf-8', err => { // Store the new stuff in the file
        if (err) console.log(err)
        else guilds = reload('./guilds.json') // Reload the file
    })
}

function getGuildConfig (guild, option) { // Get a config option from a guild
    let defaults = config.guildDefaults // Grab the defaults, just in case
    if (!guilds[guild] || !guilds[guild][option]) return defaults[option] // logic whee
    return guilds[guild][option]
}

function memberHasManageGuild (member) { // Return whether or not the user can manage the server (this is the basis for command permissions)
    return member.permission.json.manageGuild
}



c.once('ready', () => {
    // Thing to log stuff (remove me when the bot isnt broke pls)
    c.guilds.forEach(g => console.log(g.name))
    //Initialise SharedStream events
    let errorHandler = (e) => {
        console.log('SharedStream died!')
        if (e) {
            if (typeof e === 'string')
                console.log(e)
            else
                console.log(JSON.stringify(e))
        }
        process.exit(1) // Kill ourself if the stream died, so our process monitor can restart us
        // hey anon suicide is bad okay
        // please anon dont k?
    }
    sharedStream.on('error', errorHandler)
    sharedStream.on('end', errorHandler)
    sharedStream.on('disconnect', (vc) => {
        console.log(':( - Disconnected from ' + vc.id)
    })
    sharedStream.play(config.stream)
    console.log('Shared stream should be playing.')
    console.log(`Connected as ${c.user.username} / Currently in ${c.guilds.size} servers`)

    // Rejoin channels that we were connected to
    setTimeout(() => {
        for (let guild of Object.keys(guilds)) { // loop through all the servers recorded
            if (!c.guilds.get(guild)) return // If this guild doesn't exist, don't do anything with it (TODO: Also remove from guilds file so we don't make the mistake again)
            let channel = getGuildConfig(guild, 'vc') // Get the channel for this guild
            let prefix = getGuildConfig(guild, 'prefix') // Get the prefix for this guild

            if (channel) joinVoice(c, guild, channel) // Connect and play if there's one set
            if (prefix) c.registerGuildPrefix(guild, prefix) // also this
        }
    }, 3000)

    // Let's store the listeners
    let listeners = 0

    // Start all the looooops
    currentListeners()
    gameCurrentSong()
    if (config.listenersReportURL)
        sendListenersData()

    // Gets the current amount of people actively listening to the bot and sets it to a var - called once every 20 seconds
    function currentListeners () {
        let userCount = 0
        // For every guild
        c.guilds.forEach(g => {
            // For every channel that is a voice channel and we're in
            g.channels.filter(d => d.voiceMembers ? d.voiceMembers.get(c.user.id) : false).forEach(d => {
                // get the number of undeafaned users that aren't us in the currently-iterating channel
                // dw about it
                let voiceUsers = d.voiceMembers.filter(m => m.id !== c.user.id && !m.voiceState.selfDeaf && !m.voiceState.deaf).length
                // Add the number of members in this channel, not counting ourself
                userCount += voiceUsers
            })
        })
        listeners = userCount
        setTimeout(currentListeners, 20000)
    }

    function gameCurrentSong () {
        let game = 'music probably'
        if(radioJSON !== {})
            game = `${radioJSON.artist_name} ${config.separator || '-'} ${radioJSON.song_name}`

        c.editStatus({name: game})
        setTimeout(gameCurrentUsersAndGuilds, 20000)
    }

    // Changes the bot's game to a listener and guild count
    function gameCurrentUsersAndGuilds () {
        c.editStatus({name: `for ${listeners} on ${c.guilds.size} servers`})
        setTimeout(gameCurrentSong, 10000)
    }

    // Another function to send listeners data to the listen.moe server - if you're running the bot yourself, this won't happen
    function sendListenersData () {
        request.post(config.listenersReportURL, {'number': listeners }, (err, res, body) => {
            if(err)
                console.log('Etooo, crap. Couldnt update listeners. Reason: ' + err)
        })

        setTimeout(sendListenersData, 60000)
    }
})

c.on('guildCreate', guild => {
    c.createMessage(guild.id, HELP_MESSAGE.join('\n'))

    if (!c.guilds.get(guild)) return // If this guild doesn't exist, don't do anything with it (TODO: Also remove from guilds file so we don't make the mistake again)
    let channel = getGuildConfig(guild, 'vc') // Get the channel for this guild
    let prefix = getGuildConfig(guild, 'prefix') // Get the prefix for this guild

    if (channel) joinVoice(c, guild, channel) // Connect and play if there's one set
    if (prefix) c.registerGuildPrefix(guild, prefix) // also this
})

// Rewrote commands using the command framework from Eris
c.registerCommand('join', msg => {
    // Join command - joins the VC the user is in, and sets that as the music channel for the server
    // Requires manage server; can't be used in PM
    if (!memberHasManageGuild(msg.member)) return

    let member = msg.member
    let channelId = member.voiceState ? member.voiceState.channelID : null
    if (!channelId) {
        // fail
        c.createMessage(msg.channel.id, 'Join a voice channel first!')
    } else {
        // oh dang hello
        writeGuildConfig(msg.channel.guild.id, {vc: channelId})
        joinVoice(c, msg.channel.guild.id, channelId)
        c.createMessage(msg.channel.id, '\\o/')
    }

})

c.registerCommand('leave', msg => {
    // Leaves the voice channel, but not the server
    // Requires manage server; can't be used in PM
    if (!memberHasManageGuild(msg.member)) return

    let member = msg.member
    let channelId = member.voiceState ? member.voiceState.channelID : null
    if (!channelId) {
        // fail
        c.createMessage(msg.channel.id, 'Join a voice channel first!')
    } else {
        let vc = sharedStream.voiceConnections.find((vc) => vc.id === msg.guild.id)
        if (vc) {
            c.leaveVoiceChannel(channelId)
            sharedStream.voiceConnections.remove(vc)
            writeGuildConfig(msg.channel.guild.id, {vc: null})
            c.createMessage(msg.channel.id, ';_; o-okay...')
        }
    }
})

c.registerCommand('prefix', (msg, args) => {
    // Prefix command - Change's the bot's prefix in the server
    // Requires manage server; can't be used in PM
    if (!memberHasManageGuild(msg.member)) return

    if(args[0] === undefined){
        c.createMessage(msg.channel.id, 'You must provide a new prefix')
        return
    }

    let newPrefix = args[0]
    if (/[a-zA-Z0-9\s\n]/.test(newPrefix)) {
        c.createMessage(msg.channel.id, "Invalid prefix. Can't be a letter, number, or whitespace character.")
        return
    }
    writeGuildConfig(msg.channel.guild.id, {prefix: newPrefix})
    c.registerGuildPrefix(msg.channel.guild.id, newPrefix)
    c.createMessage(msg.channel.id, '\\o/')

})

c.registerCommand('ignore', msg => {
    // Ignore command - ignores user commands in this channel
    // Requires manage server; can't be used in PM
    if (!memberHasManageGuild(msg.member)) return

    let denied = getGuildConfig(msg.channel.guild.id, 'denied')
    if (!denied.includes(msg.channel.id)) {
        denied.push(msg.channel.id)
        writeGuildConfig(msg.channel.guild.id, {denied: denied})
        c.createMessage(msg.channel.id, "All right, I'll ignore this channel now.")
    } else {
        c.createMessage(msg.channel.id, "I'm already ignoring this channel.")
        return
    }
})

c.registerCommand('unignore', msg => {
    // Unignore command - Stops ignoring user commands in this channel
    // Requires manage server; can't be used in PM
    if (!memberHasManageGuild(msg.member)) return

    let denied = getGuildConfig(msg.channel.guild.id, 'denied')
    if (denied.includes(msg.channel.id)) {
        denied.splice(denied.indexOf(msg.channel.id), 1)
        writeGuildConfig(msg.channel.guild.id, {denied: denied})
        c.createMessage(msg.channel.id, "Got it! I'll stop ignoring this channel.")
    } else {
        c.createMessage(msg.channel.id, "I wasn't ignoring this channel.")
        return
    }

})

c.registerCommand('ignoreall', msg => {
    // Ignore all command - Ignores all text channels in a guild
    // Requires manage server; can't be used in PM
    if (!memberHasManageGuild(msg.member)) return

    let denied = []
    let guildObj = c.guilds.find(g => g.id === msg.channel.guild.id)
    let textChannelIds = guildObj.channels.filter(c => c.type === 0).map(c => c.id)
    textChannelIds.forEach(c => denied.push(c))
    writeGuildConfig(msg.channel.guild.id, {denied: denied})
    c.createMessage(msg.channel.id, "I'm now ignoring every channel in the server.")

})

c.registerCommand('unignoreall', msg => {
    // Unignore all command - stops ignoring all text channels
    // Requires manage server; can't be used in PM
    if (!memberHasManageGuild(msg.member)) return

    writeGuildConfig(msg.channel.guild.id, {denied: []})
    c.createMessage(msg.channel.id, "I'm no longer ignoring any channels here.")

})

c.registerCommand('np', msg => {
    // Now playing command - lists the current playing song on the radio
    if(getGuildConfig(msg.channel.guild.id, 'denied').includes(msg.channel.id)) return // Do nothing if this channel is ignored
    /*getSongInfo((err, info) => {
        if (!err) {
            let requestby = info.request ? `\n**Requested by:** ${info.requested_by} (<https://forum.listen.moe/u/${info.requested_by}>)` : ''
            let anime = info.anime_name ? `\n**Anime:** ${info.anime_name}` : ''
            c.createMessage(msg.channel.id, `**Now playing:** "${info.song_name}" by ${info.artist_name}${requestby}${anime}`)
        }
    })*/
    if(radioJSON === {}) return

    let requestby = radioJSON.requested_by ? `\n**Requested by:** ${radioJSON.requested_by} (<https://forum.listen.moe/u/${radioJSON.requested_by}>)` : ''
    let anime = radioJSON.anime_name ? `\n**Anime:** ${radioJSON.anime_name}` : ''
    c.createMessage(msg.channel.id, `**Now playing:** "${radioJSON.song_name}" by ${radioJSON.artist_name}${requestby}${anime}`)

}, { aliases: ['playing', 'nowplaying'] })

function splitMessage(message, messageLengthCap) {
    let strs = []
    while (message.length > messageLengthCap) {
        let pos = message.substring(0, messageLengthCap).lastIndexOf('\n')
        pos = pos <= 0 ? messageLengthCap : pos
        strs.push(message.substring(0, pos))
        let i = message.indexOf('\n', pos)+1
        if (i < pos || i > pos+messageLengthCap) i = pos
        message = message.substring(i)
    }
    strs.push(message)

    return strs
}

c.registerCommand('help', msg => {
    // Show the help message
    c.createMessage(msg.channel.id, HELP_MESSAGE)
})

c.registerCommand('eval', (msg, args) => {
    // Eval command - Allows the owner to dynamically run scripts against the bot from inside Discord
    // Requires explicit owner permission inside the config file
    if (!config.owners.includes(msg.author.id)) return c.createMessage(msg.channel.id, 'soz bae must be bot owner') // todo: stop using unnecessary todo lines that make lines way too long
    let thing
    try {
        let command = args.join(' ')
        console.log(command)
        thing = eval(command) // eval is harmful my ass
    } catch (e) {
        thing = e
    }

    let strs = splitMessage('' + thing, DISCORD_MSG_LIMIT)
    try {
        for (let str of strs)
            c.createMessage(msg.channel.id, str)
    } catch (e) {
        c.createMessage(msg.channel.id, e)
    }
})

c.registerCommand('servers', msg => {
    // Server list command - lists the names and id's of all servers the bot is in
    // Requires explicit owner permission inside the config file
    if (!config.owners.includes(msg.author.id)) return c.createMessage(msg.channel.id, 'soz bae must be bot owner') // jkfhasdkjhfkajshdkfsf

    let message = c.guilds.map(g=>`\`${g.id}\` ${g.name}`).join('\n')
    let strs = splitMessage(message, DISCORD_MSG_LIMIT)

    for (let str of strs) c.createMessage(msg.channel.id, str)

    // Kana was here >:O
})

/*
    Template
    c.registerCommand('servers', (msg, args) => {
        // hai
    });
*/

c.connect()

/*

TODO's
- Find more things to do

*/
