exports.run = async(client, message, Discord, args) => {
  const config = require("../auth.json");
  const GoogleImages = require("google-images");
  const gClient = new GoogleImages(config.googleCSE, config.googleAPI);

  let search = args.join(" ");

  if(!search) return message.channel.send('Please specify something to search.').then(m => m.delete(5000));

  if (search.length > 0) {
    try {
      const response = await gClient.search(search, {
        safe: "off"
      });
      if (!response) {
        let m = await message.send("Nothing Found!");
        m.delete(2000);
        return;
      } else {
        let image = response[0].url;
        const embed = await new Discord.RichEmbed()
          .setAuthor(`${search}`, 'https://a.safe.moe/F3RvU.png')
          .setColor(`#3369E8`)
          .setImage(image);
        message.channel.send("", {
          embed
        });
      }

    } catch (err) {
      let m = await message.send("Something went wrong with the search.");
      m.delete(2000);
      console.error(err);
    }
  } else {
    let m = await message.send("Invalid Parameters(???)");
    m.delete(2000);
  }
};