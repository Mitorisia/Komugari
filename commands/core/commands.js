const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class CommandsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'commands',
            aliases: ['command'],
            group: 'core',
            memberName: 'commands',
            description: 'Sends a list of all commands!',
            examples: ['~commands']
        });
    };

    async run(message) {
        var percentage = Math.random() < 0.5 ? 'heads' : 'tails'
        const mainCommands = new Discord.MessageEmbed()
            .setAuthor("Commands", 'https://a.safe.moe/Tr9Jr.png')
            .setDescription(`Use \`~help [command]\` for more details.`)
            .setColor('727293')
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .setFooter(`Click the reactions to check out other commands!`)
            .addField("__Core:__", "`commands` `nsfwcommands` `help` `invite`", true)
            .addField("__Moderation:__", "`ban` `kick` `prune`", true)
            .addField("__Utility:__", "`color` `time` `trans` `weather` `math`\n\`img` `jisho` `osu` `wiki` `urban` `yt`", true)
            .addField("__Info:__", "`avatar` `emoji` `channel` `discim`\n\`inrole` `role` `server` `user`", true)
            .addField("__Fun:__", "`8ball` `advice` `cat` `dog` `dadjoke` `f` `fortune` `horoscope` `meme` `pasta` `pickup` `rate` `rthere` `say` `sayd` `skyrim` `talk` `tsundere`\n\`bonzi` `disabled` `retarded` `shit` `shits` `thesearch` `triggered`")
            .addField("__Anime:__", "`anime` `neko` `manga` `moe` `booru` `waifu`", true)
            .addField("__Music:__", "`listen` `np` `stop`", true)
            .addField("__Action:__", "`action` `cry` `grope` `gross` `hand` `hug` `kiss` `lewd` `nobully` `noswear` `nom` `nyan` `pat` `pout` `slap` `smug` `slap` `stare` `tickle` `wasted`", true)
            .addField("__NSFW:__", "Hentai, boobs, porn, gifs, image boards, lewd nekos... \n\Say **~nsfwcommands** to see them all!");

        const secretCommands = new Discord.MessageEmbed()
            .setAuthor("Secret Commands", 'https://a.safe.moe/Tr9Jr.png')
            .setDescription(`Here's the not-so-secret and not-so-useful commands!`)
            .setColor('727293')
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .setFooter("These are only here to de-clutter the main commands interface...")
            .addField("__Owner-Only:__", "`eval` `reload`", true)
            .addField("__Bot Admin-Only:__", "`saychannel`", true)
            .addField("__Core:__", "`botinfo` `ping` `support` `uptime`", true)
            .addField("__Fun:__", "`bird` `iku` `lizard` `magik`", true)            
            .addField('__Moderation:__', '`addrole` `delrole` `hackban` `lockdown` `nickname`\n\`nuke` `pruneuser` `pruneword` `softban` `unban`', true)
            .addField("__Utility:__", "`remindme`", true);

        const nsfwCommands = new Discord.MessageEmbed()
            .setAuthor("NSFW Commands", 'https://a.safe.moe/Tr9Jr.png')
            .setDescription(`Use \`~help [command]\` for more details.`)
            .setColor('727293')
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .setFooter("Any message from me can be removed by reacting with a 🎴 emoji!")
            .addField("__2D NSFW:__", "`ecchi` `hentai` `hentaigif`\n\`hentaiirl` `neko` `pantsu`\n\`oppai` `yaoi` `yuri` `zr   `", true)
            .addField("__2D Fetish:__", "`ahegao` `bara` `bondage`\n\`futa` `monstergirl` `paizuri`\n\`sukebei` `tentacle` `trap`", true)
            .addField("__3D NSFW:__", "`4knsfw` `artsyporn` `ass` `boobs`\n\`nsfw` `nsfwgif` `pornhub` `pussy`", true)
            .addField("__3D Fetish:__", "`asian` `amateur` `bdsm`\n\`cosplay` `grool` `lingerie`", true)
            .addField("__NSFW Image Boards:__", "`danbooru` `gelbooru` `hypno` `konachan` `paheal` `rule34` `tbib` `yandere` `xbooru` `e621`");

        return new Promise(async (resolve, reject) => {
    
            const interactiveMessage = await message.channel.send({ embed: mainCommands });
            const collector = await interactiveMessage.createReactionCollector((reaction, user) => user.id === message.author.id);

            //Add the reactions
            let reactions = ['◀', '▶', '🍆', '❌'];
            for (let i = 0; i < reactions.length; i++) await interactiveMessage.react(reactions[i]);

            //Launch timeout countdown
            let timeout = setTimeout(function() {
                return collector.stop('timeout');
            }, 120000);

            //----------------------------------On collector collect------------------------------
            collector.on('collect', async(r) => {
                clearTimeout(timeout); //Reset timeout

                if (r.emoji.name === "◀") { //main commands page

                    await interactiveMessage.edit( {embed: mainCommands} );

                } else if (r.emoji.name === "▶") { //more commands page

                    await interactiveMessage.edit({ embed: secretCommands });

                } else if (r.emoji.name === '🍆') { //nsfw commands wow

                    await interactiveMessage.edit({ embed: nsfwCommands });

                } else if (r.emoji.name === "❌") {

                    collector.stop('aborted');
                }

                await r.remove(message.author.id); //Delete user reaction         
                timeout = setTimeout(function() {
                    collector.stop('timeout');
                }, 120000);
            });
            //--------------------------On collector end-----------------------------------------------
            collector.on('end', async(collected, reason) => {
                return resolve(interactiveMessage.delete());
            });
        });
        
    }
}

