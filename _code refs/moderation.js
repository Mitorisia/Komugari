/*
 * moderation.js - Moderation commands for people who are lazy.
 *
 * Contributed by Capuccino and Ovyerus
 */

/* eslint-env node */

const safe = require('safe-regex');



function deleteDelay(msg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            msg.delete().then(() => resolve()).catch(reject);
        }, 2000);
    });
}

exports.purge = {
    desc: 'Purge messages',
    longDesc: 'Purges a specified type of message with an optional amount.',
    usage: '<type> [amount up to 100]',
    permission: {both: ['manageMessages']},
    main(bot, ctx) {
        return new Promise((resolve, reject) => {
            if (!ctx.msg.member.permission.has('manageMessages')) {
                ctx.createMessage(localeManager.t('user-noPerms', ctx.settings.locale, {perm: 'Manage Messages'})).then(resolve).catch(reject);
            } else {
                if (!ctx.hasPermission('manageMessages')) {
                    ctx.createMessage(localeManager.t('bot-noPerms', ctx.settings.locale, {perm: 'Manage Messages'})).then(resolve).catch(reject);
                } else {
                    if (ctx.args.length === 0) {
                        ctx.createMessage({
                            embed: {
                                title: 'Incorrect Usage',
                                description: '**purge all [0-100]**\n**purge author <author> [0-100]**\n**purge bots [0-100]**\n**purge including <word> [0-100]**\n**purge embeds [0-100]**\n**purge attachments [0-100]**\n**purge images [0-100]**\n**purge regex <regex> [0-100]**',
                                color: 0xF21904
                            }
                        }).then(() => resolve()).catch(err => {
                            if (err.resp && err.resp.statusCode === 400) {
                                var m = '**Incorrect Usage**\n';
                                m += '`purge all [0-100]`\n';
                                m += '`purge author <author ID|author mention> [0-100]`\n';
                                m += '`purge bots [0-100]`\n';
                                m += '`purge including <word> [0-100]`\n';
                                m += '`purge embeds [0-100]`\n';
                                m += '`purge attachments [0-100]`\n';
                                m += '`purge images [0-100]`\n';
                                m += '`purge regex <regex> [0-100]`';
                                ctx.createMessage(m).then(() => resolve()).catch(reject);
                            } else {
                                reject(err);
                            }
                        });
                    } else if (ctx.args.length > 0) {
                        if (ctx.args[0] === 'all') {
                            if (!ctx.args[1] || !/^\d+$/.test(ctx.args[1])) {
                                ctx.channel.purge(100).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finish', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else if (/^\d+$/.test(ctx.args[1]) && Number(ctx.args[1]) <= 100 && Number(ctx.args[1]) >= 1) {
                                ctx.channel.purge(Number(ctx.args[1])).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finish', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else {
                                ctx.createMessage(localeManager.t('purge-limit', ctx.settings.locale)).then(() => resolve()).catch(reject);
                            }
                        } else if (ctx.args[0] === 'author') {
                            if (!ctx.args[1] || !/^(?:\d+|<@!?\d+>)$/.test(ctx.args[1])) {
                                ctx.createMessage({
                                    embed: {
                                        title: 'Incorrect Usage',
                                        description: '**purge author <author ID|author mention> [0-100]**',
                                        color: 0xF21904
                                    }
                                }).then(() => resolve()).catch(err => {
                                    if (err.resp && err.resp.statusCode === 400) {
                                        var m = '**Incorrect Usage**\n';
                                        m += '`purge author <author ID|author mention> [0-100]`';
                                        ctx.createMessage(m).then(() => resolve()).catch(reject);
                                    } else {
                                        reject(err);
                                    }
                                });
                            } else {
                                let user = ctx.args[1].match(/^(?:\d+|<@!?\d+>)$/)[0];
                                user = /<@!?\d+>/.test(user) ? user.replace(/<@!?/, '').replace('>', '') : user;
                                user = ctx.guild.members.get(user);
                                if (!user) {
                                    ctx.createMessage(localeManager.t('purge-userNotFound', ctx.settings.locale)).then(() => resolve()).catch(reject);
                                } else {
                                    if (!ctx.args[2] || !/^\d+$/.test(ctx.args[2])) {
                                        ctx.channel.purge(100, m => m.author.id === user.id).then(amt => {
                                            return ctx.createMessage(localeManager.t('purge-finishUser', ctx.settings.locale, {amt, user: utils.formatUsername(user)}));
                                        }).then(deleteDelay).then(() => resolve()).catch(reject);
                                    } else if (/^\d+$/.test(ctx.args[2]) && Number(ctx.args[2]) <= 100 && Number(ctx.args[2]) >= 1) {
                                        let i = 0;
                                        ctx.channel.purge(100, m => m.author.id === user.id && ++i <= Number(ctx.args[2])).then(amt => {
                                            return ctx.createMessage(localeManager.t('purge-finishUser', ctx.settings.locale, {amt, user: utils.formatUsername(user)}));
                                        }).then(deleteDelay).then(() => resolve()).catch(reject);
                                    } else {
                                        ctx.createMessage(localeManager.t('purge-limit', ctx.settings.locale)).then(() => resolve()).catch(reject);
                                    }
                                }
                            }
                        } else if (ctx.args[0] === 'bots') {
                            if (!ctx.args[1] || !/^\d+$/.test(ctx.args[1])) {
                                ctx.channel.purge(100, m => m.author.bot).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finishBots', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else if (/^\d+$/.test(ctx.args[1]) && Number(ctx.args[1]) <= 100 && Number(ctx.args[1]) >= 1) {
                                let i = 0;
                                ctx.channel.purge(100, m => m.author.bot && ++i <= Number(ctx.args[1])).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finishBots', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else {
                                ctx.createMessage(localeManager.t('purge-limit', ctx.settings.locale)).then(() => resolve()).catch(reject);
                            }
                        } else if (ctx.args[0] === 'including') {
                            if (!ctx.args[1]) {
                                ctx.createMessage({
                                    embed: {
                                        title: 'Incorrect Usage',
                                        description: '**purge including <word> [0-100]**',
                                        color: 0xF21904
                                    }
                                }).then(() => resolve()).catch(err => {
                                    if (err.resp && err.resp.statusCode === 400) {
                                        var m = '**Incorrect Usage**\n';
                                        m += '`purge including <content> [0-100]`';
                                        ctx.createMessage(m).then(() => resolve()).catch(reject);
                                    } else {
                                        reject(err);
                                    }
                                });
                            } else {
                                if (!ctx.args[2] || !/^\d+$/.test(ctx.args[2])) {
                                    ctx.channel.purge(100, m => m.content.includes(ctx.args[1])).then(amt => {
                                        return ctx.createMessage(localeManager.t('purge-finish', ctx.settings.locale, {amt}));
                                    }).then(deleteDelay).then(() => resolve()).catch(reject);
                                } else if (/^\d+$/.test(ctx.args[2]) && Number(ctx.args[2]) <= 100 && Number(ctx.args[2]) >= 1) {
                                    let i = 0;
                                    ctx.channel.purge(100, m => m.content.includes(ctx.args[1]) && ++i <= Number(ctx.args[2])).then(amt => {
                                        return ctx.createMessage(localeManager.t('purge-finish', ctx.settings.locale, {amt}));
                                    }).then(deleteDelay).then(() => resolve()).catch(reject);
                                } else {
                                    ctx.createMessage(localeManager.t('purge-limit', ctx.settings.locale)).then(() => resolve()).catch(reject);
                                }
                            }
                        } else if (ctx.args[0] === 'embeds') {
                            if (!ctx.args[1] || !/^\d+$/.test(ctx.args[1])) {
                                ctx.channel.purge(100, m => m.embeds.length > 0).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finishEmbeds', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else if (/^\d+$/.test(ctx.args[1]) && Number(ctx.args[1]) <= 100 && Number(ctx.args[1]) >= 1) {
                                let i = 0;
                                ctx.channel.purge(100, m => m.embeds.length > 0 && ++i <= Number(ctx.args[1])).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finishEmbeds', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else {
                                ctx.createMessage(localeManager.t('purge-limit', ctx.settings.locale)).then(() => resolve()).catch(reject);
                            }
                        } else if (ctx.args[0] === 'attachments') {
                            if (!ctx.args[1] || !/^\d+$/.test(ctx.args[1])) {
                                ctx.channel.purge(100, m => m.attachments.length > 0).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finishAttachments', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else if (/^\d+$/.test(ctx.args[1]) && Number(ctx.args[1]) <= 100 && Number(ctx.args[1]) >= 1) {
                                let i = 0;
                                ctx.channel.purge(100, m => m.attachments.length > 0 && ++i <= Number(ctx.args[1])).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finishAttachments', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else {
                                ctx.createMessage(localeManager.t('purge-limit', ctx.settings.locale)).then(() => resolve()).catch(reject);
                            }
                        } else if (ctx.args[0] === 'images') {
                            if (!ctx.args[1] || !/^\d+$/.test(ctx.args[1])) {
                                ctx.channel.purge(100, m => {
                                    if (m.attachments.length > 0) {
                                        return m.attachments.filter(atch => /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/ig.test(atch.url)).length > 0;
                                    } else {
                                        return /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/ig.test(m.content);
                                    }
                                }).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finishImages', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else if (/^\d+$/.test(ctx.args[1]) && Number(ctx.args[1]) <= 100 && Number(ctx.args[1]) >= 1) {
                                let i = 0;
                                ctx.channel.purge(100, m => {
                                    if (m.attachments.length > 0) {
                                        return m.attachments.filter(atch => /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/ig.test(atch.url)).length > 0 && ++i <= Number(ctx.args[1]);
                                    } else {
                                        return /(?:([^:/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:png|jpe?g|gifv?|webp|bmp|tiff|jfif))(?:\?([^#]*))?(?:#(.*))?/ig.test(m.content) && ++i <= Number(ctx.args[1]);
                                    }
                                }).then(amt => {
                                    return ctx.createMessage(localeManager.t('purge-finishImages', ctx.settings.locale, {amt}));
                                }).then(deleteDelay).then(() => resolve()).catch(reject);
                            } else {
                                ctx.createMessage(localeManager.t('purge-limit', ctx.settings.locale)).then(() => resolve()).catch(reject);
                            }
                        } else if (ctx.args[0] === 'regex') {
                            if (!ctx.args[1]) {
                                ctx.createMessage({
                                    embed: {
                                        title: 'Incorrect Usage',
                                        description: '**purge regex <regex> [0-100]**',
                                        color: 0xF21904
                                    }
                                }).then(() => resolve()).catch(err => {
                                    if (err.resp && err.resp.statusCode === 400) {
                                        var m = '**Incorrect Usage**\n';
                                        m += '`purge regex <regex> [0-100]`';
                                        ctx.createMessage(m).then(() => resolve()).catch(reject);
                                    } else {
                                        reject(err);
                                    }
                                });
                            } else {
                                var purgeRegex;

                                if (safe(ctx.args[1])) {
                                    purgeRegex = new RegExp(ctx.args[1]);
                                } else {
                                    ctx.createMessage(localeManager.t('purge-badRegex', ctx.settings.locale)).then(() => resolve()).catch(reject);
                                }

                                if (purgeRegex) {
                                    if (!ctx.args[2] || !/^\d+$/.test(ctx.args[2])) {
                                        ctx.channel.purge(100, m => purgeRegex.test(m.content)).then(amt => {
                                            return ctx.createMessage(localeManager.t('purge-finish', ctx.settings.locale, {amt}));
                                        }).then(deleteDelay).then(() => resolve()).catch(reject);
                                    } else if (/^\d+$/.test(ctx.args[2]) && Number(ctx.args[2]) <= 100 && Number(ctx.args[2]) >= 1) {
                                        let i = 0;
                                        ctx.channel.purge(100, m => purgeRegex.test(m.content) && ++i <= Number(ctx.args[2])).then(amt => {
                                            ctx.createMessage(localeManager.t('purge-finish', ctx.settings.locale, {amt}));
                                        }).then(deleteDelay).then(() => resolve()).catch(reject);
                                    } else {
                                        ctx.createMessage(localeManager.t('purge-limit', ctx.settings.locale)).then(() => resolve()).catch(reject);
                                    }
                                }
                            }
                        } else {
                            ctx.createMessage({
                                embed: {
                                    title: 'Incorrect Usage',
                                    description: '**purge all [0-100]**\n**purge author <author> [0-100]**\n**purge bots [0-100]**\n**purge including <word> [0-100]**\n**purge embeds [0-100]**\n**purge attachments [0-100]**\n**purge images [0-100]**\n**purge regex <regex> [0-100]**',
                                    color: 0xF21904
                                }
                            }).then(() => resolve()).catch(err => {
                                if (err.resp && err.resp.statusCode === 400) {
                                    var m = '**Incorrect Usage**\n';
                                    m += '`purge all [0-100]`\n';
                                    m += '`purge author <author ID|author mention> [0-100]`\n';
                                    m += '`purge bots [0-100]`\n';
                                    m += '`purge including <word> [0-100]`\n';
                                    m += '`purge embeds [0-100]`\n';
                                    m += '`purge attachments [0-100]`\n';
                                    m += '`purge images [0-100]`\n';
                                    m += '`purge regex <regex> [0-100]`';
                                    ctx.createMessage(m).then(() => resolve()).catch(reject);
                                } else {
                                    reject(err);
                                }
                            });
                        }
                    }
                }
            }
        });
    }
};