<html>
    <header>
        <img align="right" src="https://a.safe.moe/vIEnD.png" height="300" >
        <h1>Komugari</h1>
        <p><b>A simple, multifunctional Discord bot with a focus on anime and NSFW!</b></p>
        who am I kidding no one asks me any questions

## Index
- [Intro](#intro)
- [Requirements](#requirements)
- [Installing](#installing)
- [Setup](#setup)
- [Running](#running)
- [To-do](#todo)
- [Credits](#credits)


### Intro 
You can invite the bot to your server [here](https://discordapp.com/api/oauth2/authorize?client_id=365907645795794946&scope=bot&permissions=2083912831)!! 

Want to run Komugari yourself? Look no further, I've prepared a thorough guide on how you can get her up and running in no time! 

Yes, I am aware that I left a couple API keys in here, please don't abuse them, I am beyond simply lazy.

This bot is under constant development whether you like it or not.

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
1. Go to the [Discord Developers Applications Page](https://discordapp.com/developers/applications/me) - making sure that you're logged into the correct account
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
This is done through pressing `shift + right click` in the desired folder
```bash
# Enter into the Komugari folder
cd path/to/Komugari
# Start the bot up by initiating the code
node .
```

### Todo
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
Komugari was coded in JavaScript with [Discord.js](https://github.com/hydrabolt/discord.js).

Sole developer : ( Mako : ( as my very first coding experience

- I'm kind of really young don't expect too much from a mentally defective child

- hi I really like 2 draw 

    - [DeviantArt](http://makohime.deviantart.com/)
    - [Instagram](https://www.instagram.com/mitorisia/)
    

