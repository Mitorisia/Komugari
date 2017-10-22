const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class CommandsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'commands',
            group: 'core',
            memberName: 'commands',
            description: 'Sends a list of all commands!',
            examples: ['~commands']
        });
    };

    async run (message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor("Commands", this.client.user.displayAvatarURL({ format: 'png' }))
            .setDescription(`Use \`~help [command]\` for more details.`)
            .setColor('727293')
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .setFooter("Any message from me can be removed by reacting with a 🎴 emoji!")
            .addField("__Core:__", "`commands` `nsfwcommands` `help` `support`", true)
            .addField("__Moderation:__", "`ban` `kick` `prune`", true) //debating whether or not i want these aaasdasdasdfasdf
            .addField("__Utility:__", "`color` `time` `trans` `weather` `math`\n\`img` `jisho` `osu` `wiki` `urban` `yt`", true)
            .addField("__Info:__", "`avatar` `emoji` `channel` `inrole`\n\`role` `server` `user`", true)
            .addField("__Fun:__", "`8ball` `advice` `cat` `dog` `dadjoke` `f` `fortune` `horoscope` `meme` `pasta` `pickup` `rate` `rthere` `say` `sayd` `skyrim` `talk` `tsun` `waifu`\n\`bonzi` `disabled` `retarded` `shit` `shits` `thesearch` `triggered`")
            .addField("__Anime:__", "`anime` `neko` `manga` `moe` `safebooru` `zr`", true)
            .addField("__Voice:__", "`listen` `speak` `stop`", true)
            .addField("__Action:__", "`cry` `disgust` `grope` `hand` `hug` `kiss` `lewd` `nobully` `noswearing` `nom` `nyan` `pat` `pout` `slap` `smug` `slap` `stare` `tickle`", true)
            .addField("__NSFW:__", "Hentai, boobs, porn, gifs, image boards, lewd nekos... \n\Say **~nsfwcommands** to see them all!");
        message.channel.send({embed}).then(m=> {m.react('🎴')});

        return null; 
	}
}