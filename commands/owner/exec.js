const { Command } = require('../../commando');
const Discord = require('discord.js');
const util = require("util");
const child_process = require("child_process");
const exec = util.promisify(child_process.exec);
const commonTags = require("common-tags");

module.exports = class ExecCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'exec',
            guildOnly: true,
            aliases: ['console', 'execute'],
            group: 'owner',
            memberName: 'exec',
            description: 'Executes a command in the console!',
            examples: ['~exec [command]'],
            args: [{
                key: 'command',
                prompt: 'Please provide me a command to execute!',
                type: 'string'
            }]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    async run(message, args) {
        const { command } = args;

        let hrDiff;
        try {
            const hrStart = process.hrtime();
            this.lastResult = exec(command)
            hrDiff = process.hrtime(hrStart);
        } catch (err) {
            return msg.channel.send(`❎ | ** There was an error while executing!** \`${err}\``);
        }

        this.hrStart = process.hrtime();
        const executed = await exec(command).catch((err) => err);
        const input = `**📥 Input**\`\`\`bash\n${command}\n\`\`\``
        const output = executed.stdout ? `**📤 Output**\`\`\`bash\n${executed.stdout}\n\`\`\`` : "";

        const error = executed.stderr ? `**📤 Error**\`\`\`bash\n${executed.stderr}\n\`\`\`` : "";

        if (executed.stdout) {
            console.log(executed.stdout)
        } else {
            console.log(executed.stderr)
        }

        await message.delete();
        var time = hrDiff[0] > 0 ? `${(hrDiff[0]).toFixed(4)}s ` : '' + (hrDiff[1] / 1000000).toFixed(4)
        const embed = new Discord.MessageEmbed()
            .setColor('#CEA5B7')
            .setDescription([input, output, error].join("\n"))
            .setFooter(`${time}s`);
        return message.channel.send({ embed })
    }
}