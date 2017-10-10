const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            aliases: ['puppy', 'doggo', 'pupper'],
            group: 'fun',
            memberName: 'dog',
            description: 'Sends a random picture of a dog!',
            examples: ['~dog'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    async run (message) {
        const res = await snekfetch.get('https://random.dog/woof.json')
        const image = res.body.url
    
        const embed = new Discord.MessageEmbed()
            .setImage(image)
            .setFooter('http://www.random.dog ©', 'https://random.dog/3f62f2c1-e0cb-4077-8cd9-1ca76bfe98d5.jpg')
            .setColor('#71A3BE')
        return message.channel.send({embed})
	}
}