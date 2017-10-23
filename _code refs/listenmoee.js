//    {"title":"Odyssey Radio",             "genre":"Anime",            "url":"https://listen.moe/stream",                                "tuneinId":"s277012"},

stream(guildsMap,client,args,message){
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      message.channel.send(lib.embed(`**ERROR:** Please join a voice channel first`,message));
    }else {
      if (!voiceChannel.permissionsFor(client.user).has('CONNECT') || !voiceChannel.permissionsFor(client.user).has('SPEAK')){
        var padding = '';
        for (var x = voiceChannel.name.length+1; x < 38; x++) padding+=' ';
        return message.channel.send(lib.embed(`**ERROR:** Insufficient permissions\n\`\`\`${voiceChannel.name} ${padding}Speak ${voiceChannel.speakable ? '✔':'✘'} | Join ${voiceChannel.joinable ? '✔':'✘'}\`\`\``,message));
      }
      if (args[0]) {
        let vconnec = client.voiceConnections.get(message.guild.defaultChannel.id);
        if (vconnec) {
          let dispatch = vconnec.player.dispatcher;
          if (dispatch){
            lib.clearQueue(guildsMap,client,message);
            dispatch.end();
          }
        }
        if (args[0].startsWith('https')) {
          require('https').get(args[0], (res) => {
            voiceChannel.join().then(connnection => {
              var dispatcher = connnection.playStream(res, {passes:2, volume:0.15});
              dispatcher.on('end', () => {
                var np = guildsMap.get(message.guild.id);
                if (np) delete np.playing;
                guildsMap.set(message.guild.id, np);
              });
            });
          });
        }else {
          require('http').get(args[0], (res) => {
            voiceChannel.join().then(connnection => {
              var dispatcher = connnection.playStream(res, {passes:2, volume:0.15});
              dispatcher.on('end', () => {
                var np = guildsMap.get(message.guild.id);
                if (np) delete np.playing;
                guildsMap.set(message.guild.id, np);
              });
            });
          });
        }
      }else {
        message.channel.send(lib.embed(`**ERROR:** Please specify the stream url as a parameter`,message));
      }
    }
  }

  radio(guildsMap,args,message){
    var prefix = guildsMap.get(message.guild.id).prefix;
    var stream = this.stream;
    if (args[0]) {
      var choice = parseInt(args[0])-1;
      if (choice>0 && choice<config.radio.length) {
        request(`https://feed.tunein.com/profiles/${config.radio[choice].tuneinId}/nowPlaying`, function (error, response, body) {
          if (error!=null) {
            message.channel.send(lib.embed(`**ERROR:** Could not access TuneIn API`,message));
          }else {
            body = JSON.parse(body);
            stream(guildsMap,client,[config.radio[choice].url],message);
            var guildData = guildsMap.get(message.guild.id);
            guildData.playing = config.radio[choice].tuneinId;
            guildsMap.set(message.guild.id,guildData);
            message.channel.send({embed:new Discord.RichEmbed()
              .setDescription(`**Now Streaming:** ${config.radio[choice].title}\n${body.Secondary ? `**Currently Playing:**  ${body.Secondary.Title}`:''}`)
              .setThumbnail(body.Primary.Image)
              .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)});
          }
        });
      }else {
        message.channel.send(lib.embed(`**ERROR:** Selection does not exist`,message));
      }
    }else {
      var desc = ``;
      for (var i = 0; i < config.radio.length; i++) {
        var commandPadding = '';
        var titlePadding = '';
        for (var x = prefix.length+('radio').length+(i+1).toString().length; x < 11; x++) {
          commandPadding+=' ';
        }
        for (var x = config.radio[i].title.length; x < 30; x++) {
          titlePadding+=' ';
        }
        desc += `${guildsMap.get(message.guild.id).prefix}radio ${i+1}${commandPadding} | ${config.radio[i].title}${titlePadding} | ${config.radio[i].genre}\n`;
      }
      message.channel.send({embed:new Discord.RichEmbed()
        .setTitle(`:radio: Programmed Stations:`)
        .setDescription(`\`\`\`Command      | Radio Station                  | Genre\n-------------------------------------------------------------\n${desc}\`\`\``)
        .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)});
    }
  }

  nowPlaying(guildsMap,message){
    var np = guildsMap.get(message.guild.id).playing;
    if (np) {
      request(`https://feed.tunein.com/profiles/${np}/nowPlaying`, function (error, response, body) {
        if (error!=null) {
          message.channel.send(lib.embed(`**ERROR:** Could not access TuneIn API`,message));
        }else {
          body = JSON.parse(body);
          message.channel.send({embed:new Discord.RichEmbed()
            .setDescription(`${body.Secondary ? `**Currently Playing:** ${body.Secondary.Title}`:'No ID3 Tags found for this stream'}`)
            .setThumbnail(body.Secondary ? body.Secondary.Image:'')
            .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : config.hexColour}`)});
        }
      });
    }else {
      message.channel.send(lib.embed(`**ERROR:** No streaming data could be found`,message));
    }
  }
