const { Command } = require('../../commando');


module.exports = class LockdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lockdown',
            aliases: ['lock', 'ld'],
            group: 'moderation',
            memberName: 'lockdown',
            description: 'Prevents users from posting in the current channel!',
            details: 'Use `lockdown start` and `lockdown stop` to start and stop a lockdown respectively!',
            guildOnly: true,
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            examples: ['~lockdown [start/stop]'],
            args: [{
                key: 'type',
                prompt: 'Please enter either start or stop.',
                type: 'string',
                default: 'start',
                validate: type => {
                    if (['start', 'stop'].includes(type.toLowerCase())) return true;
                    return 'Please enter either start or stop.';
                },
                parse: type => type.toLowerCase()
            }]
        });
    }

    async run(message, args) { // eslint-disable-line consistent-return
        const { type } = args;
        if (type === 'start') {
            await message.channel.overwritePermissions(message.guild.defaultRole, { SEND_MESSAGES: false }, `Lockdown initiated by ${message.author.tag}`);
            return message.channel.send(`Lockdown has initiated! Most users are now unable to send a message in this channel!\n\Please use \`lockdown stop\` to end the lockdown!`);

        } else if (type === 'stop') {
            await message.channel.overwritePermissions(message.guild.defaultRole, { SEND_MESSAGES: null }, `Lockdown terminated by ${message.author.tag}`);
            return message.channel.send('Lockdown ended!');
        }
    }
};