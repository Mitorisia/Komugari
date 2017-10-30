const { Command } = require('../../commando');
const Discord = require('discord.js');

module.exports = class DiscrimCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'discrim',
            aliases: ['discriminator', 'search-discrim'],
            group: 'info',
            memberName: 'discrim',
            description: 'Finds all the users with the same discriminator!',
            args: [{
                key: 'discrim',
                prompt: 'Which discriminator would you like to search for?',
                type: 'string',
                default: '',
                validate: discrim => {
                    if (/[0-9]+$/g.test(discrim) && discrim.length === 4) return true;
                    return 'Invalid Discriminator.';
                }
            }]
        });
    }

    run(message, args) {
        const discrim = args.discrim || message.author.discriminator;
        const users = this.client.users.filter(user => user.discriminator === discrim).map(user => user.tag);
        if (users.length < 1) return message.channel.send(`**${message.author.username}**, no users found with the discriminator **${discrim}**!`);

        const embed = new Discord.MessageEmbed()
            .setTitle(`${users.length} ${users.length > 1 ? 'users' : 'user'} with the discriminator: ${discrim}`)
            .setColor('#4C6684')
            .setDescription(users);
        return message.channel.send({ embed });
    }
};