<p style="text-align:center;">
<h1>Komugari</h1>
    <h3>A simple, multifunctional bot based on anime and NSFW</h3>
    Komugari is very helpful to intro-level programmers wanting to learn javascript. As she is how I learned to code.

## Index
- [Commands](COMMANDS.md)
- [Requirements](#requirements))
- [Installing](#installing)
- [Setup](#setup)
- [Running](#running)
- [To-do](#todo)
- [Credits](#credits)

### Requirements
- `git` ([Windows](https://git-scm.com/download/win) | [Linux](https://git-scm.com/download/linux) | [macOS](https://git-scm.com/download/mac))
- `node` ([Windows](https://nodejs.org/en/download/current/) | [Linux](https://nodejs.org/en/download/package-manager/) | [macOS](https://nodejs.org/en/download/current

### Installing
Open a command window where you want the bot to be installed. 
    -This is done through pressing `shift + right click` in the desired folder
```bash
# Clone the bot from the git repo
git clone https://github.com/DysphoriAlluka/Komugari.git
# Enter the bot folder
cd Komugari
# Install npm dependencies
npm i
```

### Setup
1. Go to the [Discord Developers Applications Page]() - making sure that you're logged into the correct account
2. Create an app and enter the desired credentials
3. Make the app into a bot user
4. Click `Reveal Token` to get your unique bot token. This is equivalent to an username and a password - don't let anyone see your token
5. Go to `index.js` and replace `process.env.TOKEN` with your token, surrounded with quotation marks
6. Invite your bot to your server
    1. Locate the invite link 
        >https://discordapp.com/api/oauth2/authorize?client_id=[**YOUR_ID_HERE**]&scope=bot&permissions=0
    2. Place your client ID in the right location. Your client ID contains **only** numbers
    3. Open the link and invite your bot!

That's it! You should be good to go!

### Running
Open a command window where you want the bot to be installed. 
    -This is done through pressing `shift + right click` in the desired folder
```bash
# Enter into the Komugari folder
cd path/to/Komugari
# Start the bot up by initiating the code
node .
```

### Todo
- [ ] categorized commands (???)
- [ ] Anime search command 
- [ ] ratewaifu
- [ ] Horoscope using the [horoscope api](http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today) 
- [ ] osu! user search!
- [ ] Action commands
    - [ ] cuddle
    - [ ] grope
    - [ ] hand
    - [ ] hug
    - [ ] kiss
    - [ ] lewd
    - [ ] pat
    - [ ] slap
- [ ] Moderation commands
    - [ ] Ban -> send DM
    - [ ] Kick -> send DM
    - [ ] prune 
    - [ ] warn role -> send DM

> This list is in the order of priority

### Credits 
Komugari was coded in JavaScript with [discord.js](https://github.com/hydrabolt/discord.js)

Sole developer : ( Mako : ( as my very first coding experience
    - hi I really like 2 draw 
        - [DeviantArt](http://makohime.deviantart.com/)
        - [Instagram](https://www.instagram.com/mitorisia/)
    - also i'm really young don't expect too much from a mentally defective child

