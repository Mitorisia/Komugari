const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

//remember to return before every promise
module.exports = class NSFWCommandsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nsfwcommands',
            group: 'core',
            memberName: 'nsfwcommands',
            description: 'Lists all the NSFW commands!',
            examples: ['~nsfwcommands']
        });
    }

    run (message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor("NSFW Commands", this.client.user.displayAvatarURL({ format: 'png' }))
            .setDescription(`Use \`~help [command]\` for more details.`)
            .setColor('727293')
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .setFooter("Any message from me can be removed by reacting with a 🎴 emoji.")
            .addField("__2D NSFW:__", "`ecchi` `hentai` `hentaigif` `hentaiirl`\n\`neko` `pantsu` `tiddy` `yaoi` `yuri`", true)
            .addField("__2D Fetish:__", "`ahegao` `futa` `hentaibondage` `hentiny`\n\`monstergirl` `sukebei` `tentacle` `trap`", true)
            .addField("__3D NSFW:__", "`4knsfw` `artsyporn` `ass` `boobs` `cleavage`\n\`nsfw` `nsfwgif` `pornhub` `pussy`", true)
            .addField("__3D Fetish:__", "`asian` `amateur` `bdsm`\n\`cosplay` `grool` `lingerie`", true)
            .addField("__NSFW Image Boards:__", "`danbooru` `gelbooru` `konachan` `rule34` `yandere` `e621`");
        message.channel.send({embed}).then(m=> {m.react('🎴')});

        return null;
	}
}