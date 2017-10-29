const { Command } = require('../../commando');
const Discord = require('discord.js');
const request = require('request');
const https = require('https');


module.exports = class ListenCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'listen',
            aliases: ['listenmoe', 'radio', 'play'],
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
        var stream; 

        if (!voiceChannel) { 

            message.react('💢'); 
            return message.channel.send('Join a voice channel to hear me!'); 
         
          } else { 

            try { 
             
              if (!this.client.voiceConnections.get(message.guild.id)) { 
                let inAC = setInterval(function() {inactivityDetectionFn(this, message)}, 10000);
                var broadcast = this.client.createVoiceBroadcast();

                getStream()
                .then(res => {
                    message.member.voiceChannel.join().then(connection => {
                        broadcast.playStream(res);
                        var dispatcher = connection.playBroadcast(broadcast);

                        dispatcher.on('end', async (reason) => {
                            clearInterval(inAC);
                            if(reason == "heck") {
                                message.channel.send("⚠ Left voice channel due to inactivity!")  
                                delete connection.channel.textChannel;
                                return connection.disconnect();
                            }  
                        });
                    })
                })
                .catch(err => {
                    console.log(err)
                });

                message.channel.send(`Now streaming https://listen.moe/ in **${voiceChannel.name}**!`)
        
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
}

function getStream() {
    const options = {
        hostname: 'listen.moe',
        port: '',
        path: '/stream',
        method: 'GET',
        headers: { 'User-Agent': `Komugari; Discord Bot in Development; Github: https://github.com/Mitorisia/Komugari` }
    };
    return new Promise((resolve, reject) => {
        https.get(options, res => resolve(res))
            .on('error', err => {
                console.error(err); // eslint-disable-line no-console
                return reject(new Error('error in stream'));
            });
    });
}

function inactivityDetectionFn(interval, message) {
	if(!message.guild.me.voiceChannel) return clearInterval(interval);
	if(message.guild.me.voiceChannel.members.filter(member => !member.user.bot && !member.deaf).size < 1 || message.guild.me.mute) {
		clearInterval(interval);
		message.guild.voiceConnection.dispatcher.end("heck");
	}
}
