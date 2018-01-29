const { Command } = require('../../commando');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

const MY_GIT = require('../../package').repository.replace(/^github:/, '')

module.exports = class GitHubCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'github',
            guildOnly: true,
            aliases: ['git', 'source'],
            group: 'utility',
            memberName: 'github',
            description: 'Finds a repository on GitHub!',
            details: 'If none provided, returns my own repository instead!',
            examples: ['~github <user/repo>'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: 'repo',
                label: 'repo',
                prompt: 'Please provide me a repository to search for!',
                type: 'string',
                default: 'Mitorisia/Komugari'
            }]
        });
    }

    async run(message, args) {
        args = args.repo
        var searche = args

        if (searche[0].indexOf('/') !== -1) {
            const repo = safeRepo(searche[0])
            const msg = await message.channel.send(`🔄 | Loading info for \`${repo}\`\u2026`)
            try {
                const res = await snekfetch.get(`https://api.github.com/repos/${repo}`)
                if (res.status !== 200) {
                    return msg.edit('Could not connect to GitHub server!')
                }

                return msg.edit({ embed: buildEmbedFromJson(res.body) })
            } catch (err) {
                if (new RegExp('404 Not Found', 'i').test(err.toString())) {
                    return msg.edit('That repository could not be found!')
                } else {
                    throw err
                }
            }
        } else {
            const query = args ? args : 'Komugari'
            const msg = await message.channel.send(`🔄 | Searching for **${query}**...`)

            const res = await snekfetch.get(`https://api.github.com/search/repositories?q=${query ? query.length < 2 ? query.join('+') : query : 'Komugari'}`)
            if (res.status !== 200) {
                return msg.edit('Failed to connect to the GitHub server!')
            }

            if (res.body.items.length < 1) {
                return msg.edit(`No results found for **${query}**`)
            }

            const count = res.body.items.length = Math.min(3, res.body.items.length)
            await msg.delete()

            const send = async i => {
                if (!res.body.items[i]) {
                    return
                }
                await message.channel.send(`${i + 1} of ${count} results for **${query}**`, {
                    embed: buildEmbedFromJson(res.body.items[i])
                })
                await send(i + 1)
            }
            return send(0)
        }
    }
}

function safeRepo(input) {
    if (input.indexOf('/') === -1) {
        return
    }

    const user = input.substr(0, input.indexOf('/'))
    input = input.substr(input.indexOf('/') + 1)
    const repo = input.indexOf('/') === -1 ? input : input.substr(0, input.indexOf('/'))
    return `${user}/${repo}`
}

function buildEmbedFromJson(json) {

    const isMyGit = json.full_name === MY_GIT

    return new Discord.MessageEmbed()
        .setAuthor(json.full_name, 'https://a.safe.moe/cxwFp.png')
        .setURL(json.html_url)
        .setColor(isMyGit ? '#4078c0' : '#070044')
        .setThumbnail(isMyGit ? 'https://a.safe.moe/jmHJI.jpg' : '')
        .setDescription(json.description || '`No description provided`')
        .setFooter(isMyGit ? 'Please leave a star! ฅ (˵´•ω • `˵๑)' : '')
        .addField('❯\u2000\Information', `•\u2000\**Owner:** [${json.owner.login}](${json.owner.html_url})\n\•\u2000\**Primary Language:** ${json.language || '`N/A`'}`)
        .addField('❯\u2000\Links', `•\u2000[Home page](${json.html_url})\n\•\u2000[Downloads](${json.html_url}/releases)\n\•\u2000[Issues](${json.html_url}/issues)`, true)
        .addField('❯\u2000\Statistics', `•\u2000\**Stars:** ${json.stargazers_count}\n\•\u2000\**Watchers:** ${json.subscribers_count || json.watchers_count}\n\•\u2000\**Open Issues:** ${json.open_issues_count}`, true)
        .addField('❯\u2000\Clone', `\`\`\`git clone ${json.clone_url}\`\`\``);
}