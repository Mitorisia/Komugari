//oh my hecking god how did i even sit here and write all of this???? this is so.. wtf is this
//also no, I do not know of a simpler way to do this,,,,,,,,,,,,,,,,,,,,,,aaaa if you can fix this please do not hesitate :" ))

exports.run = (client, message, Discord, args) => {
    var helpCommand = message.content.split(/\s+/g)[1]
    if(message.content == '~help') { //base help
        const embed = new Discord.RichEmbed()
        .setAuthor(`Komugari`, client.user.displayAvatarURL)
        .setColor('#727293')
        .setThumbnail(client.user.displayAvatarURL)
        .setFooter(`Mako#8739 | Any message from the me can be removed by reacting with a 🎴 emoji.`)
        .setDescription('Hi! I\'m Komugari and I am a bot based around anime, memes, and NSFW!')
        .addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=305523782)`, true)
        .addField(`__Support:__`, `\`~support [message]\``, true)        
        .addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`)
    return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('talk')) { //talk cleverbot
     const embed = new Discord.RichEmbed()
        .setAuthor(`Talk`, 'https://a.safe.moe/S4jjl.png')
        .setColor('727293')
        .setFooter(`Fun | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Talk to the bot using the cleverbot api.` )
        .addField(`__Usage:__`, "`~! [sentence]` | `~talk [sentence]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('color')) { //color
     const embed = new Discord.RichEmbed()
        .setAuthor(`Color`, 'https://a.safe.moe/Yfolq.jpg')
        .setColor('727293')
        .setFooter(`Utility | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Shows preview for a given hex color, if none provided, a random color will be generated.` )
        .addField(`__Usage:__`, "`~color <color code>`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('img')) { //google image search
     const embed = new Discord.RichEmbed()
        .setAuthor(`Img/Image`, 'https://a.safe.moe/F3RvU.png')
        .setColor('727293')
        .setFooter(`Search | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Searches google images for your word or keyword.` )
        .addField(`__Usage:__`, "`~img [search tag or keyword]`", true)
        .addField(`__Note:__`, `Please do not spam it as it is limited per day.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('say')) { //say
     const embed = new Discord.RichEmbed()
        .setAuthor(`Say`, client.user.displayAvatarURL)
        .setColor('727293')
        .setFooter(`Hidden | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Makes Ben speak your sentence for you, and then removes your command.`)
        .addField(`__Usage:__`, "`~say [message]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('saytts')) { //saytts
     const embed = new Discord.RichEmbed()
        .setAuthor(`SayTTS`, client.user.displayAvatarURL)
        .setColor('727293')
        .setFooter(`Hidden | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Makes Ben speak your sentence for you in TTS, and then removes your command.`)
        .addField(`__Usage:__`, "`~! [sentence]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('support')) { //support message
     const embed = new Discord.RichEmbed()
        .setAuthor(`Support`, client.user.displayAvatarURL)
        .setColor('727293')
        .setFooter(`Info | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Sends your message to the support server.` )
        .addField(`__Usage:__`, "`~support [questions, inquiries, feedback, issues, or bugs] <~dm>`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('time')) { //time command
     const embed = new Discord.RichEmbed()
        .setAuthor(`Time`, 'https://a.safe.moe/jE3GJ.png')
        .setColor('727293')
        .setFooter(`Utility | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Tells the date and time in a specific location.` )
        .addField(`__Usage:__`, "`~time [location]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('weather')) { //weather command
     const embed = new Discord.RichEmbed()
        .setAuthor(`Weather`, 'https://a.safe.moe/JPcx7.png')
        .setColor('727293')
        .setFooter(`Utility | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Shows detailed weather information for the given location.` )
        .addField(`__Usage:__`, "`~weather [location]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('wiki')) { //wikipedia command
     const embed = new Discord.RichEmbed()
        .setAuthor(`Wiki`, 'https://a.safe.moe/8GCNj.png')
        .setColor('727293')
        .setFooter(`Search | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Returns the summary of the first matching search result from Wikipedia.`)
        .addField(`__Usage:__`, "`~wiki [query]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('translate')) { //translation
     const embed = new Discord.RichEmbed()
        .setAuthor(`Translate`, 'https://a.safe.moe/2jXgX.png')
        .setColor('727293')
        .setFooter(`Utility | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Translates the given text to a specified language.`)
        .addField(`__Usage:__`, "`~translate [language] [foreign text]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(message.content == ('~help help')) { //help????help???
     const embed = new Discord.RichEmbed()
        .setAuthor(`Help`, client.user.displayAvatarURL)
        .setColor('727293')
        .setFooter(`Info | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Shows the main help message.`)
        .addField(`__Usage:__`, "`~help`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))
    
     
    } else if(helpCommand === ('commands')) { //commands
     const embed = new Discord.RichEmbed()
        .setAuthor(`Commands`, client.user.displayAvatarURL)
        .setColor('727293')
        .setFooter(`Info | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Shows list of commands.`)
        .addField(`__Usage:__`, "`~commands`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('smug')) { //smug
     const embed = new Discord.RichEmbed()
        .setAuthor(`Smug`, 'http://smug.moe/smg/17.png')
        .setColor('727293')
        .setFooter(`Action | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Sends a random smug anime picture.`)
        .addField(`__Usage:__`, "`~smug`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))

    } else if(helpCommand === ('disgust')) { //smug
        const embed = new Discord.RichEmbed()
           .setAuthor(`Disgust`, 'http://i.imgur.com/YV3oSUV.jpg')
           .setColor('727293')
           .setFooter(`Action | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Absolutely disgusting! Now which one of you likes ***handholding!?***`)
           .addField(`__Usage:__`, "`~disgust`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('rightthere')) { //right there
     const embed = new Discord.RichEmbed()
        .setAuthor(`Right There`, client.user.displayAvatarURL)
        .setColor('727293')
        .setFooter(`Fun | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Outputs a random 'right there' emojipasta.`)
        .addField(`__Usage:__`, "`~rightthere`", true)
        .addField(`__Note:__`, `Contains nsfw elements and language.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('cat')) { //random cat
     const embed = new Discord.RichEmbed()
        .setAuthor(`Cat`, 'https://a.safe.moe/6GDXu.png')
        .setColor('727293')
        .setFooter(`Fun | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Shows a random picture of a cat. Who doesn't love cats?`)
        .addField(`__Usage:__`, "`~cat`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('dog')) { //random cat
        const embed = new Discord.RichEmbed()
           .setAuthor(`Dog`, 'https://random.dog/3f62f2c1-e0cb-4077-8cd9-1ca76bfe98d5.jpg')
           .setColor('727293')
           .setFooter(`Fun | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Shows a random picture of a dog. Doggos are the best`)
           .addField(`__Usage:__`, "`~dog`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('8ball')) { //8ball
     const embed = new Discord.RichEmbed()
        .setAuthor(`8ball`, 'https://a.safe.moe/aKDHV.png')
        .setColor('727293')
        .setFooter(`Fun | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Ask the all knowing 8ball a question.`)
        .addField(`__Usage:__`, "`~8ball [question]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('youtube')) { //youtube
     const embed = new Discord.RichEmbed()
        .setAuthor(`YouTube`, 'https://a.safe.moe/V3Dhb.png')
        .setColor('727293')
        .setFooter(`Search | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Searches for videos on YouTube.`)
        .addField(`__Usage:__`, "`~youtube [query]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('danbooru')) { //danbooru search 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Danbooru`, 'https://a.safe.moe/ppHw0.png')
        .setColor('727293')
        .setFooter(`NSFW Image Boards | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Searches for images on Danbooru.`)
        .addField(`__Usage:__`, "`~danbooru <tags>`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('safebooru')) { //safebooru search 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Safebooru`, 'https://a.safe.moe/ppHw0.png')
        .setColor('727293')
        .setFooter(`NSFW - 2D | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Searches for images on Safebooru.`)
        .addField(`__Usage:__`, "`~safebooru [tags]`", true)
        .addField(`__Note:__`, `Keep in mind Safebooru's definition of safe.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('gelbooru')) { //gelbooru search 
        const embed = new Discord.RichEmbed()
           .setAuthor(`Gelbooru`, 'https://a.safe.moe/ppHw0.png')
           .setColor('727293')
           .setFooter(`NSFW Image Boards | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Searches for images on Gelbooru.`)
           .addField(`__Usage:__`, "`~gelbooru <tags>`", true)
           .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('konachan')) { //konachan.com search 
        const embed = new Discord.RichEmbed()
           .setAuthor(`Konachan`, 'https://a.safe.moe/ppHw0.png')
           .setColor('727293')
           .setFooter(`NSFW Image Boards | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Searches for images on Konachan.com`)
           .addField(`__Usage:__`, "`~konachan <tags>`", true)
           .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('yandere')) { //yandere search 
        const embed = new Discord.RichEmbed()
           .setAuthor(`Yandere`, 'https://a.safe.moe/ppHw0.png')
           .setColor('727293')
           .setFooter(`NSFW Image Boards | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Searches for images on Yandere.`)
           .addField(`__Usage:__`, "`~yandere <tags>`", true)
           .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('e621')) { //e621 search 
        const embed = new Discord.RichEmbed()
           .setAuthor(`e621`, 'https://a.safe.moe/ppHw0.png')
           .setColor('727293')
           .setFooter(`NSFW Image Boards | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Searches for images on e621.`)
           .addField(`__Usage:__`, "`~e621 <tags>`", true)
           .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
        return message.channel.send({embed}).then(m=>m.react("🎴"))

    } else if(helpCommand === ('pornhub')) { //e621 search 
        const embed = new Discord.RichEmbed()
           .setAuthor(`PornHub`, 'https://cdn.discordapp.com/emojis/366936784283762689.png')
           .setColor('727293')
           .setFooter(`NSFW - 3D | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Searches for videos on PornHub.`)
           .addField(`__Usage:__`, "`~pornhub <tags>`", true)
           .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('neko')) { //lewd neko
     const embed = new Discord.RichEmbed()
        .setAuthor(`Neko`, 'https://a.safe.moe/3XYZ6.gif')
        .setColor('727293')
        .setFooter(`NSFW - 2D | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Uses [nekos.life](http://nekos.life/) to send you the best images of lewd nekos.`)
        .addField(`__Usage:__`, "`~neko`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('catgirl')) { //sfw neko
        const embed = new Discord.RichEmbed()
           .setAuthor(`Cat Girl`, 'https://a.safe.moe/3XYZ6.gif')
           .setColor('727293')
           .setFooter(`Anime | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Uses [nekos.life](http://nekos.life/) to send you the best images of catgirls.`)
           .addField(`__Usage:__`, "`~catgirl`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('ass')) { //ass
     const embed = new Discord.RichEmbed()
        .setAuthor(`Ass`, 'https://a.safe.moe/cM3Vs.png')
        .setColor('727293')
        .setFooter(`NSFW - 3D | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Sends a random picture of ass. 'Ain't no playin' around, you just gotta get in there, and eat the whole ass, bruh.'`)
        .addField(`__Usage:__`, "`~ass`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('boobs')) { //boobs
     const embed = new Discord.RichEmbed()
        .setAuthor(`Boobs`, 'https://a.safe.moe/cM3Vs.png')
        .setColor('727293')
        .setFooter(`NSFW - 3D | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Sends a random picture of boobs.`)
        .addField(`__Usage:__`, "`~boobs`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('hentaiirl')) { //reddit trash
     const embed = new Discord.RichEmbed()
        .setAuthor(`Hentai_Irl`, 'https://a.safe.moe/jZZKM.png')
        .setColor('727293')
        .setFooter(`NSFW - 2D| Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Sends a random picture from [r/hentai_irl](https://www.reddit.com/r/hentai_irl/).`)
        .addField(`__Usage:__`, "`~hentaiirl`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('meme')) { //reddit trash
     const embed = new Discord.RichEmbed()
        .setAuthor(`Meme`, client.user.displayAvatarURL)
        .setColor('727293')
        .setFooter(`Fun | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Have me bring you the best and freshest memes from selected meme subreddits.`)
        .addField(`__Usage:__`, "`~meme`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('nsfwgif')) { //reddit trash
     const embed = new Discord.RichEmbed()
        .setAuthor(`NSFW.gif`, 'https://a.safe.moe/O8TDd.png')
        .setColor('727293')
        .setFooter(`NSFW - 3D | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Returns an NSFW gif from [r/NSFW_GIF](https://www.reddit.com/r/NSFW_GIF/)`)
        .addField(`__Usage:__`, "`~nsfwgif`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('hentai')) { //reddit trash
     const embed = new Discord.RichEmbed()
        .setAuthor(`Hentai`, 'https://a.safe.moe/jZZKM.png')
        .setColor('727293')
        .setFooter(`NSFW - 2D | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Have me bring you the best and freshest hentai from selected hentai subreddits.`)
        .addField(`__Usage:__`, "`~hentai`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('rule34')) { //rule34 search 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Rule34`, 'https://a.safe.moe/ppHw0.png')
        .setColor('727293')
        .setFooter(`NSFW Image Boards | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Searches for images on Rule34.`)
        .addField(`__Usage:__`, "`~rule34 <tags>`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('nsfw')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`NSFW`, 'https://a.safe.moe/cM3Vs.png')
        .setColor('727293')
        .setFooter(`NSFW - 3D | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Have me bring you the best and freshest porn from selected NSFW subreddits.`)
        .addField(`__Usage:__`, "`~nsfw`", true)
        .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('shit')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Shit`, 'https://a.safe.moe/h0JMI.png')
        .setColor('727293')
        .setFooter(`Memes | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Ugh, I stepped in what now?`)
        .addField(`__Usage:__`, "`~shit [whatever's on the bottom of your foot]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('triggered')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Triggered`, 'https://a.safe.moe/h0JMI.png')
        .setColor('727293')
        .setFooter(`Memes | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Old, stank meme. Is this still relevant?`)
        .addField(`__Usage:__`, "`~triggered <mention>`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('f')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`F to Pay Respects`, 'https://a.safe.moe/TGUHH.png')
        .setColor('727293')
        .setFooter(`Fun | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Better pay up your respects.`)
        .addField(`__Usage:__`, "`~f <what you're paying respects to>`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('urban')) { //google image search
     const embed = new Discord.RichEmbed()
        .setAuthor(`Urban`, 'https://a.safe.moe/1fscn.png')
        .setColor('727293')
        .setFooter(`Search | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Searches Urban Dictionary for your word or keyword.` )
        .addField(`__Usage:__`, "`~urban <search tag or keyword>`", true)
        .addField(`__Note:__`, `If left blank, it will return a random definition.`, true);
     return message.channel.send({embed}).then(m=> m.react('🎴'))


    } else if(helpCommand === ('shits')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Shits`, 'https://a.safe.moe/h0JMI.png')
        .setColor('727293')
        .setFooter(`Memes | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Let them know what's shit and what's not.`)
        .addField(`__Usage:__`, "`~shits [something that is clearly shit]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('retarded')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Retarded`, 'https://a.safe.moe/h0JMI.png')
        .setColor('727293')
        .setFooter(`Memes | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`What's this? A cute little dog..?`)
        .addField(`__Usage:__`, "`~retarded [something really retarded]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('thesearch')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`The Search`, 'https://a.safe.moe/h0JMI.png')
        .setColor('727293')
        .setFooter(`Memes | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Is intelligible life still prevalent?`)
        .addField(`__Usage:__`, "`~thesearch [something extraterrestrial life finds mundane]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('bonzi')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Bonzi`, 'https://a.safe.moe/h0JMI.png')
        .setColor('727293')
        .setFooter(`Memes | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Tell an amazing fact!`)
        .addField(`__Usage:__`, "`~bonzi [an amazing fact]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('disabled')) { 
     const embed = new Discord.RichEmbed()
        .setAuthor(`Disabled`, 'https://a.safe.moe/h0JMI.png')
        .setColor('727293')
        .setFooter(`Memes | Any message from me can be removed by reacting with a 🎴 emoji.`)
        .setDescription(`Disabilities: know the difference between what's disabled and what's not.`)
        .addField(`__Usage:__`, "`~disabled [mention | image URL]`")
     return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('trap')) { //reddit trash
        const embed = new Discord.RichEmbed()
           .setAuthor(`Trap`, 'https://a.safe.moe/jZZKM.png')
           .setColor('727293')
           .setFooter(`NSFW - 2D | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`Traps are only 2.19% gay.`)
           .addField(`__Usage:__`, "`~trap`", true)
           .addField(`__Note:__`, `This command can only be used in NSFW channels.`, true)
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('zr')) { //reddit trash
        const embed = new Discord.RichEmbed()
           .setAuthor(`Zettai Ryouiki`, 'https://a.safe.moe/AuUEW.jpg')
           .setColor('727293')
           .setFooter(`Anime | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`"Absolute Territory" (絶対領域, zettai ryouiki) describes the amount of bare thigh skin between the skirt and stockings or socks for female characters.`)
           .addField(`__Usage:__`, "`~zr`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ('moe')) { //reddit trash
        const embed = new Discord.RichEmbed()
           .setAuthor(`Moe`, 'https://a.safe.moe/SYe8T.jpg')
           .setColor('727293')
           .setFooter(`Anime | Any message from me can be removed by reacting with a 🎴 emoji.`)
           .setDescription(`ONLY the cutest anime girls.`)
           .addField(`__Usage:__`, "`~moe`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("rate")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Rate", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Fun | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Rates the given item out of 10.`)
            .addField(`__Usage:__`, "`~rate [item]`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("osu")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Osu!", 'https://a.safe.moe/Z7DGu.png')
            .setColor('727293')
            .setFooter("Search | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Searches for an user on Osu!`)
            .addField(`__Usage:__`, "`~osu [user]`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("horoscope")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Horoscope", 'http://images.indianexpress.com/2017/01/zodiac-love-2017-main_820_thinkstockphotos-481896132.jpg?w=820')
            .setColor('727293')
            .setFooter("Fun | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Gives you your daily horoscope!`)
            .addField(`__Usage:__`, "`~horoscope [sign]`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("anime")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Anime", 'https://myanimelist.cdn-dena.com/img/sp/icon/apple-touch-icon-256.png')
            .setColor('727293')
            .setFooter("Anime | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Searches for an anime on MyAnimeList!`)
            .addField(`__Usage:__`, "`~anime [name/tag]`", true)
            .addField(`__Note:__`, 'Use `~anime` to get an anime suggestion!', true)
        return message.channel.send({embed}).then(m=>m.react("🎴"))
        

    } else if(helpCommand === ("speak")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Speak", 'https://a.safe.moe/hZGj2.gif')
            .setColor('727293')
            .setFooter("Anime | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Plays a random anime sound...?`)
            .addField(`__Usage:__`, "`~speak`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("quote")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Quote", 'https://a.safe.moe/hZGj2.gif')
            .setColor('727293')
            .setFooter("Anime | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`A random quote from a random character!`)
            .addField(`__Usage:__`, "`~quote`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))
    

    } else if(helpCommand === ("hand")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Hand", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Holds hands with the user you mentioned... lewd.`)
            .addField(`__Usage:__`, "`~hand <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("hug")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Hug", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Hugs the user you mentioned!`)
            .addField(`__Usage:__`, "`~hug <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("kiss")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Kiss", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Kisses the user you mentioned!`)
            .addField(`__Usage:__`, "`~kiss <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("lewd")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Lewd", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`That's *lewd*!`)
            .addField(`__Usage:__`, "`~lewd`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("cry")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Cry", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`uWaa`)
            .addField(`__Usage:__`, "`~cry`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))

    } else if(helpCommand === ("nobully")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("No Bully", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Absolutely no bullying allowed!`)
            .addField(`__Usage:__`, "`~nobully`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("pat")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Pat", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Pats the user you mentioned!`)
            .addField(`__Usage:__`, "`~pat <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("slap")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Slap", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Slaps the user you mentioned!`)
            .addField(`__Usage:__`, "`~slap <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))

    } else if(helpCommand === ("grope")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Slap", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Gropes(...?) the user you mentioned...?`)
            .addField(`__Usage:__`, "`~grope <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))

    } else if(helpCommand === ("lick")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Lick", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Licks the user you mentioned!`)
            .addField(`__Usage:__`, "`~lick <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))

    } else if(helpCommand === ("nom")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Nom", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Noms on the user you mentioned!`)
            .addField(`__Usage:__`, "`~nom <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))

    } else if(helpCommand === ("nyan")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Nyan", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Nyaa~`)
            .addField(`__Usage:__`, "`~nyan`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))

    } else if(helpCommand === ("pout")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Pout", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Let them know who's sulking!`)
            .addField(`__Usage:__`, "`~pout <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else if(helpCommand === ("stare")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Stare", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Stares at the user you mentioned!`)
            .addField(`__Usage:__`, "`~stare <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))

        
    } else if(helpCommand === ("tickle")) {
        const embed =  new Discord.RichEmbed()
            .setAuthor("Tickle", client.user.displayAvatarURL)
            .setColor('727293')
            .setFooter("Action | Any message from me can be removed by reacting with a 🎴 emoji.")
            .setDescription(`Tickles the user you mentioned!`)
            .addField(`__Usage:__`, "`~tickle <user>`")
        return message.channel.send({embed}).then(m=>m.react("🎴"))


    } else {
        const embed = new Discord.RichEmbed()
            .setAuthor(`Komugari`, client.user.displayAvatarURL)
            .setColor('#727293')
            .setThumbnail(client.user.displayAvatarURL)
            .setFooter(`Mako#8739 | Any message from the me can be removed by reacting with a 🎴 emoji.`)
            .setDescription('Hi! I\'m Komugari and I am a bot based around anime, memes, and NSFW!')
            .addField(`__Invite Me!:__`, `[Invite Link](https://discordapp.com/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=305523782)`, true)
            .addField(`__Support:__`, `\`~support [message]\``, true)
            .addField(`__Commands:__`, `Use \`~commands\` to see a list of my commands.\n\You can also use \`~help [command]\` to get help on a specific command.`)
     return message.channel.send(`The command **${helpCommand}** was not found!`, {embed: embed}).then(m=>m.react("🎴"))		
    }
}