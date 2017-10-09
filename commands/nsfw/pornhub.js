exports.run = (client, message, Discord, args) => {
  var s = message.content.split(/\s+/g).slice(1).join(" ");

  const Pornsearch = require('pornsearch').default;
  const Searcher = new Pornsearch(s);

  try {
  Searcher.videos()
  .then(videos => message.channel.send(videos[1].url));

  } catch (err) {
    message.channel.send(`No results found for **${s}**`)
  }

}