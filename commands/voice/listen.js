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
        var voiceChannel = message.member.voiceChannel;

        if (!voiceChannel) { 

            message.react('💢'); 
            return message.channel.send('Join a voice channel to hear me!'); 
         
          } else { 

            try { 
             
              if (!this.client.voiceConnections.get(message.guild.id)) { 
        
                require('https').get('https://listen.moe/stream', (res) => {
                    voiceChannel.join().then(connnection => {
                      var dispatcher = connnection.playStream(res, {passes:2, volume:0.15});
                    });
                  });
        
              } else { 
                message.react('‼'); 
                return message.channel.send('Hold on... I\'m already playing in a voice channel!'); 
            }

          } catch(err) {
            console.log(err);
            return message.channel.send(`Something went wrong while streaming the radio! Please report this issue! ${err}`)
          } 
	}
}