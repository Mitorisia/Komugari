/* also add listen nowplaying arguement if you can
*  sure why am i talking to myself in second person in some weird incomplete code
*  args : play, nowplaying/np, stop
*  leave if there isn't anyone in the vc
*/

const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class ListenCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'listen',
            aliases: ['listenmoe', 'radio'],
            group: 'voice',
            memberName: 'listen',
            guildOnly: true,
            description: 'Plays the Listen.moe radio!',
            examples: ['~listen [play/stop/np]'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run (message) {
        return message.channel.send('This command is not yet avaliable to the public!');
	}
}