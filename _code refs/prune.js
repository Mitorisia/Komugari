const safe = require('safe-regex');

const IncorrectUse = 0xF21904;
const ImageRegex = /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/gi;

exports.loadAsSubcommands = true;
exports.commands = [
    'all',
    'author',
    'bots',
    'including',
    'embeds',
    'codeblocks',
    'attachments',
    'images',
    'regex'
];

exports.main = {
    desc: 'Purge messages in a channel. This only works for messages younger than two weeks.',
    usage: '<type> [amount]',
    aliases: ['prune'],
    permissions: { both: 'manageMessages' },
    async main(bot, ctx) {
        let num = Number(ctx.args[0]);

        if (!isNaN(num) && num <= 100 && num >= 1) {
            await exports.all.main(bot, ctx);
        } else {
            await ctx.createMessage({
                embed: {
                    title: 'Incorrect Usage',
                    description: '**purge [1-100]\n' +
                        'purge all [1-100]\n' +
                        'purge author <author> [1-100]\n' +
                        'purge bots [1-100]\n' +
                        'purge including <word(s)> [1-100]\n' +
                        'purge embeds [1-100]\n' +
                        'purge codeblocks [1-100]\n' +
                        'purge attachments [1-100]\n' +
                        'purge images [1-100]\n' +
                        'purge regex <regex> [1-100]**',
                    color: IncorrectUse,
                    footer: { text: 'Note: This cannot delete any messages that are older than two weeks.' }
                }
            });
        }
    }
};

exports.all = {
    desc: 'Purges all types of messages.',
    usage: '[1-100]',
    async main(bot, ctx) {
        let num = Number(ctx.args[0]);

        if (isNaN(num)) {
            await purge(ctx, null, 'Purged **amt** message(s).');
        } else if (num <= 100 && num >= 1) {
            let amt = await ctx.channel.purge(num);
            let m = await ctx.createMessage(`Purged **${amt}** message${amt === 1 ? '' : 's'}.`);
            await deleteDelay(m);
        } else {
            await tooSpicy(ctx);
        }
    }
};

exports.author = {
    desc: 'Purges all messages from a specific user.',
    usage: '<user> [1-100]',
    async main(bot, ctx) {
        if (!ctx.args[0]) {
            await ctx.createMessage({
                embed: {
                    title: 'Incorrect Usage',
                    description: '**purge author <author ID|author mention> [1-100]**',
                    color: IncorrectUse
                }
            });
        } else {
            let user = await bot.lookups.memberLookup(ctx, ctx.args[0], false);

            if (!user) {
                await ctx.createMessage('That user could not be found.');
            } else {
                let num = Number(ctx.args[1]);

                if (isNaN(num)) {
                    await purge(ctx, m => m.author.id === user.id, `Purged **amt** message(s) from **${bot.formatUser(user)}**.`);
                } else if (num <= 100 && num >= 1) {
                    let i = 0;
                    await purge(ctx, m => m.author.id === user.id && ++i <= num, `Purged **amt** message(s) from **${bot.formatUser(user)}**.`);
                } else {
                    await tooSpicy(ctx);
                }
            }
        }
    }
};

exports.bots = {
    desc: 'Purges all messages from bots.',
    usage: '[1-100]',
    async main(bot, ctx) {
        let num = Number(ctx.args[0]);

        if (isNaN(num)) {
            await purge(ctx, m => m.author.bot, 'Purged **amt** bot message(s)');
        } else if (num <= 100 && num >= 100) {
            let i = 0;
            await purge(ctx, m => m.author.bot && ++i <= num, 'Purged **amt** bot messag(s)');
        } else {
            await tooSpicy(ctx);
        }
    }
};

exports.including = {
    desc: 'Purges all messages including a specific word or phrase.',
    usage: '<content> [1-100]',
    async main(bot, ctx) {
        if (!ctx.args[0]) {
            await ctx.createMessage({
                embed: {
                    title: 'Incorrect Usage',
                    description: '**purge including <word(s)> [1-100]**',
                    color: IncorrectUse
                }
            });
        } else {
            let num = Number(ctx.args[1]);
            let inc = ctx.args[0].toLowerCase();

            if (isNaN(num)) {
                await purge(ctx, m => m.content.toLowerCase().includes(inc), 'Purged **amt** message(s).');
            } else if (num <= 100 && num >= 1) {
                let i = 0;
                await purge(ctx, m => m.content.toLowerCase().includes(inc) && ++i <= num, 'Purged **amt** message(s).');
            } else {
                await tooSpicy(ctx);
            }
        }
    }
};

exports.embeds = {
    desc: 'Purge all messages containing an embed.',
    usage: '[1-100]',
    async main(bot, ctx) {
        let num = Number(ctx.args[0]);

        if (isNaN(num)) {
            await purge(ctx, m => m.embeds.length > 0, 'Purged **amt** embed(s).');
        } else if (num <= 100 && num >= 1) {
            let i = 0;
            await purge(ctx, m => m.embeds.length > 0 && ++i <= num, 'Purged **amt** embed(s).');
        } else {
            await tooSpicy(ctx);
        }
    }
};

exports.codeblocks = {
    desc: 'Purge messages containing a codeblock.',
    usage: '[1-100]',
    async main(bot, ctx) {
        let num = Number(ctx.args[0]);

        if (isNaN(num)) {
            await purge(ctx, codeblockFilter, 'Purged **amt** codeblock(s).');
        } else if (num <= 100 && num >= 1) {
            let i = 0;
            await purge(ctx, m => codeblockFilter(m) && ++i <= num, 'Purged **amt** codeblock(s).');
        } else {
            await tooSpicy(ctx);
        }
    }
};

exports.attachments = {
    desc: 'Purge messages with attachments.',
    usage: '[1-100]',
    async main(bot, ctx) {
        let num = Number(ctx.args[0]);

        if (isNaN(num)) {
            await purge(ctx, m => m.attachments.length > 0, 'Purged **amt** attachment(s).');
        } else if (num <= 100 && num >= 1) {
            let i = 0;
            await purge(ctx, m => m.attachments.length > 0 && ++i <= num, 'Purged **amt** attachment(s).');
        } else {
            await tooSpicy(ctx);
        }
    }
};

exports.images = {
    desc: 'Purge messages containing an image.',
    usage: '[1-100]',
    async main(bot, ctx) {
        let num = Number(ctx.args[0]);

        if (isNaN(num)) {
            await purge(ctx, imageFilter, 'Purged **amt** image(s).');
        } else if (num <= 100 && num >= 1) {
            let i = 0;
            await purge(ctx, m => imageFilter(m) && ++i <= num, 'Purged **amt** image(s).');
        } else {
            await tooSpicy(ctx);
        }
    }
};

exports.regex = {
    desc: 'Purge messages that match a regex.',
    usage: '<regex> [1-100]',
    async main(bot, ctx) {
        if (!ctx.args[0]) {
            await ctx.createMessage({
                embed: {
                    title: 'Incorrect Usage',
                    description: '**purge regex <regex> [1-100]**'
                }
            });
        } else {
            let purgeRegex;
            if (safe(ctx.args[0])) purgeRegex = new RegExp(ctx.args[0], 'mi');
            else return await ctx.createMessage('Invalid or unsafe regex.');

            if (purgeRegex) {
                let num = Number(ctx.args[1]);

                if (isNaN(num)) {
                    await purge(ctx, m => purgeRegex.test(m.content), 'Purged **amt** message(s).');
                } else if (num <= 100 && num >= 1) {
                    let i = 0;
                    await purge(ctx, m => purgeRegex.test(m.content) && ++i <= num, 'Purged **amt** message(s).');
                } else {
                    await tooSpicy(ctx);
                }
            }
        }
    }
};

function deleteDelay(msg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            msg.delete().then(resolve).catch(reject);
        }, 1000);
    });
}

async function tooSpicy(ctx) {
    await ctx.createMessage('Woah there, way too spicy. I only accept numbers between `1` and `100`');
}

async function purge(ctx, filter, msg) {
    let canPurge = await checkAges(ctx, 100);

    if (canPurge) {
        let amt = await ctx.channel.purge(100, filter);
        let m = await ctx.createMessage(msg.replace('amt', amt));

        await deleteDelay(m);
    } else {
        await ctx.createMessage('Unable to delete messages, as amount to purge would include messages that are two weeks old.\n' +
            'There is nothing I can do about this as it is a limitation with Discord. :(');
    }
}

async function checkAges(ctx, i) {
    let msgs = await ctx.channel.getMessages(i);
    msgs = msgs.filter(m => Date.now() - m.timestamp >= 1000 * 60 * 60 * 24 * 7 * 2); // Filter messages that are younger than two weeks

    return msgs.length === 0;
}

function codeblockFilter(msg) {
    let split = msg.content.split('```');
    if (split.length >= 3) return true;
    return false;
}

function imageFilter(msg) {
    if (msg.attachments.length > 0) {
        return msg.attachments.filter(a => a.height).length > 0;
    } else if (msg.embeds.length > 0) {
        return msg.embeds.filter(e => e.type === 'image').length > 0;
    } else {
        return ImageRegex.test(msg.content);
    }
}