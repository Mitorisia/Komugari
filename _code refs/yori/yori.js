/*
 * yori.js - Random anime image command.
 *
 * Contributed by Capuccino, Ovyerus.
 * 
 * API and service provided by Yorium (yorium.moe)
 */

/* eslint-env node */

const cheerio = require('cheerio');
const got = require('got');

const dirRegex = /.+\//;
const imgRegex = /.+\.(?:png|jpg)/;
const baseUrl = 'http://i.yorium.moe/albums/';
const ignore = require('./ignores.json');

exports.commands = [
    'yori'
];

exports.yori = {
    desc: 'Get a random anime picture.',
    longDesc: 'Scrapes i.yorium.moe for a random anime picture.',
    main(bot, ctx) {
        return new Promise((resolve, reject) => {
            ctx.channel.sendTyping();
            let albums, album;
            got(baseUrl).then(res => {
                let $ = cheerio.load(res.body);
                albums = $('a').text().trim().substring(16).trim().split(' ').filter(alb => dirRegex.test(alb)).filter(alb => !~ignore.indexOf(alb));
                album = albums[Math.floor(Math.random() * albums.length)];
                return got(baseUrl + album);
            }).then(res => {
                let $ = cheerio.load(res.body);
                let imgs = $('a').text().trim().substring(16).trim().split(' ').filter(i => imgRegex.test(i));
                let img = imgs[Math.floor(Math.random() * albums.length)];
                return ctx.createMessage(baseUrl + album + img);
            }).then(resolve).catch(reject);
        });
    }
};