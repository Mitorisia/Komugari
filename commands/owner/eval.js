const util = require('util');
const discord = require('discord.js');
const tags = require('common-tags');
const escapeRegex = require('escape-string-regexp');
const { Command } = require('../../commando');

const nl = '!!NL!!';
const nlPattern = new RegExp(nl, 'g');

module.exports = class EvalCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'eval',
                group: 'owner',
                memberName: 'eval',
                description: 'Executes arbitrary JavaScript code!',
                details: 'Only the bot owner may use this command!',

                args: [{
                    key: 'script',
                    prompt: 'Please provide me some code to evaluate!',
                    type: 'string'
                }]
            });

            this.lastResult = null;
        }

        hasPermission(msg) {
            return this.client.isOwner(msg.author);
        }

        run(msg, args) {
            // Make a bunch of helpers
            /* eslint-disable no-unused-vars */
            const message = msg;
            const client = msg.client;
            const objects = client.registry.evalObjects;
            const lastResult = this.lastResult;
            const doReply = val => {
                if (val instanceof Error) {
                    msg.channel.send(`There was a callback error! \`${val}\``);
                } else {
                    const result = this.makeResultMessages(val, process.hrtime(this.hrStart));
                    if (Array.isArray(result)) {
                        for (const item of result) {
                            if (this.client.options.selfbot) msg.say(item);
                            else msg.channel.send(item);
                        }
                    } else {
                        msg.channel.send(result);
                    }
                }
            };
            /* eslint-enable no-unused-vars */

            // Run the code and measure its execution time
            let hrDiff;
            try {
                const hrStart = process.hrtime();
                this.lastResult = eval(args.script);
                hrDiff = process.hrtime(hrStart);
            } catch (err) {
                return msg.channel.send(`<:CANCELLEDLMFAO:372188144059285505> **| There was an error while evaluating!** \`${err}\``);
            }

            // Prepare for callback time and respond
            this.hrStart = process.hrtime();
            let response = this.makeResultMessages(this.lastResult, hrDiff, args.script, msg.editable);
            if (msg.editable) {
                if (response instanceof Array) {
                    if (response.length > 0) response = response.slice(1, response.length - 1);
                    for (const re of response) msg.say(re);
                    return null;
                } else {
                    return msg.edit(response);
                }
            } else {
                msg.delete()
                return msg.channel.send(response);
            }
        }

        makeResultMessages(result, hrDiff, input = null, editable = false) {
                const inspected = util.inspect(result, { depth: 0 })
                    .replace(nlPattern, '\n')
                    .replace(this.sensitivePattern, '--snip--');
                const split = inspected.split('\n');
                const last = inspected.length - 1;
                const prependPart = inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== "'" ? split[0] : inspected[0];
                const appendPart = inspected[last] !== '}' && inspected[last] !== ']' && inspected[last] !== "'" ?
                    split[split.length - 1] :
                    inspected[last];
                const prepend = `\`\`\`javascript\n${prependPart}\n`;
                const append = `\n${appendPart}\n\`\`\``;
                if (input) {
                    return discord.splitMessage(tags.stripIndents `
				${editable ? `
					*Input*
					\`\`\`javascript
					${input}
					\`\`\`` :
				''}
				**📥 Input**
				\`\`\`javascript
				${input}
				\`\`\`
				**📤 Output** \`${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms\`
				\`\`\`javascript
				${inspected}
				\`\`\`
			`, 1900, '\n', prepend, append);
		} else {
			return discord.splitMessage(tags.stripIndents`
				**Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms!**
				\`\`\`javascript
				${inspected}
				\`\`\`
			`, 1900, '\n', prepend, append);
		}
	}

	get sensitivePattern() {
		if(!this._sensitivePattern) {
			const client = this.client;
			let pattern = '';
			if(client.token) pattern += escapeRegex(client.token);
			Object.defineProperty(this, '_sensitivePattern', { value: new RegExp(pattern, 'gi') });
		}
		return this._sensitivePattern;
	}
};